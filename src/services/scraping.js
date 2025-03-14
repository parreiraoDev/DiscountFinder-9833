import cron from 'node-cron';
import { scrapeProducts } from './scraper';
import { supabase } from './supabaseClient';

// Scraping configuration
const SCRAPING_INTERVAL = '0 */1 * * *'; // Every hour
const SOURCES = ['amazon', 'aliexpress', 'shein', 'asos'];
const CATEGORIES = ['electronics', 'fashion', 'home', 'beauty'];

const saveProduct = async (product) => {
  const { data: existingProduct } = await supabase
    .from('products')
    .select('id')
    .eq('title', product.title)
    .single();

  if (existingProduct) {
    // Update existing product price
    await supabase
      .from('product_prices')
      .upsert({
        product_id: existingProduct.id,
        platform: product.platform,
        original_price: product.originalPrice,
        discounted_price: product.discountedPrice,
        url: product.url,
        last_checked: new Date().toISOString()
      });

    // Add to price history
    await supabase
      .from('price_history')
      .insert({
        product_id: existingProduct.id,
        platform: product.platform,
        price: product.discountedPrice
      });
  } else {
    // Insert new product
    const { data: newProduct } = await supabase
      .from('products')
      .insert({
        title: product.title,
        description: product.description,
        image_url: product.image,
        category: product.category
      })
      .select()
      .single();

    // Insert initial price
    await supabase
      .from('product_prices')
      .insert({
        product_id: newProduct.id,
        platform: product.platform,
        original_price: product.originalPrice,
        discounted_price: product.discountedPrice,
        url: product.url
      });
  }
};

const checkPriceAlerts = async () => {
  const { data: alerts } = await supabase
    .from('price_alerts')
    .select(`
      *,
      product:products(*),
      user:users(*)
    `)
    .eq('is_active', true);

  for (const alert of alerts) {
    const { data: latestPrice } = await supabase
      .from('product_prices')
      .select('discounted_price')
      .eq('product_id', alert.product_id)
      .order('last_checked', { ascending: false })
      .limit(1)
      .single();

    if (latestPrice && latestPrice.discounted_price <= alert.target_price) {
      // Send notification
      await sendPriceAlert(alert.user.email, {
        productTitle: alert.product.title,
        currentPrice: latestPrice.discounted_price,
        targetPrice: alert.target_price,
        productUrl: alert.product.url
      });

      // Update alert status if it's one-time
      if (alert.frequency === 'immediate') {
        await supabase
          .from('price_alerts')
          .update({ is_active: false })
          .eq('id', alert.id);
      }
    }
  }
};

const startScrapingJob = () => {
  cron.schedule(SCRAPING_INTERVAL, async () => {
    console.log('Starting scraping job...');
    
    for (const source of SOURCES) {
      for (const category of CATEGORIES) {
        try {
          const products = await scrapeProducts(source, category);
          for (const product of products) {
            await saveProduct(product);
          }
        } catch (error) {
          console.error(`Error scraping ${source} - ${category}:`, error);
        }
      }
    }

    await checkPriceAlerts();
    console.log('Scraping job completed');
  });
};

export { startScrapingJob };