import puppeteer from 'puppeteer';
import { delay } from '../utils';

export const scrapeShein = async (category) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.shein.com/category/${category}`);
    await delay(2000); // Wait for dynamic content

    const products = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.S-product-item')).map(item => ({
        title: item.querySelector('.S-product-item__name')?.textContent?.trim(),
        price: parseFloat(
          item.querySelector('.S-product-item__price-current')
            ?.textContent?.replace(/[^0-9.]/g, '')
        ),
        originalPrice: parseFloat(
          item.querySelector('.S-product-item__price-original')
            ?.textContent?.replace(/[^0-9.]/g, '')
        ),
        image: item.querySelector('.S-product-item__img-main')?.src,
        url: item.querySelector('a')?.href,
        platform: 'shein'
      }));
    });

    return products.filter(p => p.title && p.price);
  } finally {
    await browser.close();
  }
};