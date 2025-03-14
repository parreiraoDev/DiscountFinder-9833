import puppeteer from 'puppeteer';
import { delay } from '../utils';

export const scrapeAsos = async (category) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.asos.com/${category}`);
    await delay(2000);

    const products = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('article[data-auto-id="productTile"]')).map(item => ({
        title: item.querySelector('h2')?.textContent?.trim(),
        price: parseFloat(
          item.querySelector('[data-auto-id="productTilePrice"]')
            ?.textContent?.replace(/[^0-9.]/g, '')
        ),
        originalPrice: parseFloat(
          item.querySelector('[data-auto-id="productTilePrice"] span')
            ?.textContent?.replace(/[^0-9.]/g, '')
        ),
        image: item.querySelector('img')?.src,
        url: item.querySelector('a')?.href,
        platform: 'asos'
      }));
    });

    return products.filter(p => p.title && p.price);
  } finally {
    await browser.close();
  }
};