import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

interface ProductInfo {
  name: string;
  urls: {
    url: string;
    selector: string;
    isComplexPrice?: boolean;
  }[];
}

async function scrapePrice(url: string, selector: string, isComplexPrice?: boolean): Promise<number | null> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const extractPrice = (el: cheerio.Cheerio): number | null => {
      let priceText = el.text().trim();

      // Extract the price using a regular expression
      const priceMatch = priceText.match(/\$?\s*([\d.,]+)/);
      let price = priceMatch ? priceMatch[1] : '';
      
      // Clean up the price string
      price = price.replace(/[^\d.,]/g, ''); // Remove all non-digit characters except . and ,
      
          // Handle different price formats
      if (price.includes(',')) {
        // If price uses comma as decimal separator
        price = price.replace('.', '').replace(',', '.');
      } else {
        // If price uses dot as decimal separator or has no decimal
        price = price.replace(',', '');
      }
    
      // Parse the price as a float
      let numericPrice = parseFloat(price);

      return isNaN(numericPrice) ? null : numericPrice;
    };

    let priceElement = $(selector);
    if (priceElement.length === 0) {
      priceElement = $(`[class*="${selector.replace(/^\./, '')}"]`);
    }

    let price: number | null = null;

    if (priceElement.length > 0) {
      price = extractPrice(priceElement);
    } else {
      $('*').each((_, el) => {
        const elementPrice = extractPrice($(el));
        if (elementPrice !== null && (price === null || elementPrice > price)) {
          price = elementPrice;
        }
      });
    }

    if (price === null) {
      return null;
    }

    return price;
  } catch (error) {
    console.error('Error scraping price:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  const products: ProductInfo[] = await request.json();

  const results = await Promise.all(
    products.map(async (product) => {
      const prices = await Promise.all(
        product.urls.map(({ url, selector, isComplexPrice }) => scrapePrice(url, selector, isComplexPrice))
      );
      const validPrices = prices.filter((price): price is number => price !== null);
      const averagePrice = validPrices.length > 0
        ? validPrices.reduce((a, b) => a + b, 0) / validPrices.length
        : null;
      return {
        name: product.name,
        prices,
        averagePrice,
      };
    })
  );

  return NextResponse.json(results);
}