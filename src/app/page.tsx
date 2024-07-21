import { Suspense } from 'react';
import ProductInfo from './components/ProductInfo';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  name: string;
  urls: {
    url: string;
    selector: string;
    isComplexPrice?: boolean;
  }[];
}

async function fetchPrices(products: Product[]) {
  const res = await fetch('/api/fetchPrices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(products),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch prices');
  }

  return res.json();
}

export default async function Home() {
  const products: Product[] = [
    {
      name: 'Coca Cola 2.25Lts',
      urls: [
        { url: 'https://www.cotodigital3.com.ar/sitios/cdigi/producto/-gaseosa-coca-cola-sabor-original--225-lt/_/A-00014450-00014450-200', selector: '.price_regular_precio' },
        { url: 'https://www.masonline.com.ar/gaseosa-coca-cola-sabor-original-2-25-lt/p', selector: '.valtech-gdn-dynamic-product-0-x-dynamicProductPrice mb4' },
        { 
          url: 'https://diaonline.supermercadosdia.com.ar/gaseosa-coca-cola-sabor-original-225-lt-14837/p', 
          selector: '.vtex-product-price-1-x-currencyContainer', 
          isComplexPrice: true 
        }, 
       { 
          url: 'https://www.carrefour.com.ar/gaseosa-coca-cola-sabor-original-225-l/p', 
          selector: '.valtech-carrefourar-product-price-0-x-sellingPriceValue', 
          isComplexPrice: true 
        }, 
      ],
    },
  ];

  const results = await fetchPrices(products);

  return (
    <div className="min-h-screen">
      <nav className="w-full grid items-center grid-cols-3 border-b border-neutral-300 h-20 shadow-sm relative">
        <Link className="col-start-2 col-end-3 justify-self-center" href="/">
          <Image className="col-start-2 col-end-3 justify-self-center"
            src="/CocaHoy.png"
            alt="Precio de la Coca Cola de 2.25Lts"
            width={200}
            height={100}
          />
        </Link>
      </nav>
      <main className="p-4">      
        <Suspense fallback={<div>Loading...</div>}>
          {results.map((result, index) => (
            <ProductInfo key={index} {...result} />
          ))}
        </Suspense>
      </main>
    </div>
  );
}