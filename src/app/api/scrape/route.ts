import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const selector = searchParams.get('selector');

  if (!url || !selector) {
    return NextResponse.json({ error: 'Missing url or selector' }, { status: 400 });
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let priceText = $(selector).text().trim();

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

    // If the price is less than 100, assume it's in hundreds and multiply by 100
    if (numericPrice < 100) {
      numericPrice *= 100;
    }

    if (isNaN(numericPrice)) {
      return NextResponse.json({ error: 'Failed to parse price' }, { status: 400 });
    }

    return NextResponse.json({ price: numericPrice.toFixed(2) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scrape the website' }, { status: 500 });
  }
}