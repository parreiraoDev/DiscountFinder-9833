import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

const SOURCES = {
  amazon: {
    url: 'https://www.amazon.com',
    selectors: {
      product: '.s-result-item',
      title: 'h2 a span',
      price: '.a-price-whole',
      image: '.s-image',
      rating: '.a-icon-star-small .a-icon-alt',
      reviews: '.a-size-base.s-underline-text'
    }
  },
  aliexpress: {
    url: 'https://www.aliexpress.com',
    selectors: {
      product: '.list--gallery--C2f2tvm',
      title: '.manhattan--titleText--WccSjUS',
      price: '.manhattan--price-sale--1CCSZfK',
      image: '.manhattan--img--36qUqZx',
      rating: '.manhattan--evaluation--3cz0Ltn',
      reviews: '.manhattan--trade--2PeJIGB'
    }
  },
  // Add more sources with their selectors
};

export const scrapeProducts = async (source, category, page = 1) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const browserPage = await browser.newPage();
  
  try {
    await browserPage.goto(`${SOURCES[source].url}/s?k=${category}&page=${page}`);
    const content = await browserPage.content();
    const $ = cheerio.load(content);
    
    const products = [];
    const selectors = SOURCES[source].selectors;

    $(selectors.product).each((i, el) => {
      const product = {
        title: $(el).find(selectors.title).text().trim(),
        price: parseFloat($(el).find(selectors.price).text().replace(/[^0-9.]/g, '')),
        image: $(el).find(selectors.image).attr('src'),
        rating: parseFloat($(el).find(selectors.rating).text()),
        reviews: parseInt($(el).find(selectors.reviews).text().replace(/[^0-9]/g, '')),
        source,
        url: $(el).find('a').first().attr('href')
      };

      if (product.title && product.price) {
        products.push(product);
      }
    });

    return products;
  } finally {
    await browser.close();
  }
};

export const startScrapingJob = async () => {
  const categories = ['electronics', 'fashion', 'home', 'beauty'];
  const allProducts = [];

  for (const source of Object.keys(SOURCES)) {
    for (const category of categories) {
      try {
        const products = await scrapeProducts(source, category);
        allProducts.push(...products);
      } catch (error) {
        console.error(`Error scraping ${source} - ${category}:`, error);
      }
    }
  }

  return allProducts;
};