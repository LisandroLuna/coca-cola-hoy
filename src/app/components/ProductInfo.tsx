interface ProductInfoProps {
  name: string;
  prices: (number | null)[];
  averagePrice: number | null;
}

export default function ProductInfo({ name, prices, averagePrice }: ProductInfoProps) {
  if (averagePrice === null) {
    return <div>Failed to fetch prices</div>;
  }

  return (    
    <div className="w-full 2xl:max-w-[1400px] m-[0_auto] flex flex-col lg:flex-row gap-8 justify-center lg:mt-20 p-4">
      <div className="bg-white shadow-lg rounded-md p-8 lg:max-w-lg w-full h-fit border-t-[2px] border-teal-500">
        <h2 className="md:text-lg font-bold text-neutral-500 text-center mb-4">Coca Oficial</h2>
        <div className="w-full flex flex-row gap-8 justify-evenly">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl md:text-lg text-neutral-500">2.25Lts</h2>
            <p className="text-xl md:text-3xl text-teal-600 font-bold"><span id="official-rate">$ {averagePrice.toFixed(2)}</span></p>
          </div>
        </div>
        <div className="flex flex-col text-right mt-3">
          <span className="text-sm">*Promedio de supermercados</span>
        </div>
      </div>
      <div className="flex flex-col gap-4" >
        <div className="bg-white shadow-lg flex h-full flex-col gap-4 md:gap-0 md:flex-row relative md:items-center rounded-md p-4 md:p-8 lg:max-w-2xl w-full border-t-[2px] border-teal-500 px-4 overflow-hidden">
          <div className="flex flex-col">
            <h2 className="md:text-lg text-nowrap font-bold text-neutral-500 md:text-left">Coca Blue</h2>
            <span className="text-sm">-50% 2da</span>
          </div>
          <div className="flex flex-row gap-2 md:gap-4 md:ml-8 w-full justify-end">
            <h2 className="text-neutral-500">2.25Lts</h2>
            <p className="text-teal-600 text-nowrap font-bold"><span id="tourist-rate">$ {(averagePrice*0.75).toFixed(2)}</span></p>
          </div>
        </div>
        <div className="bg-white shadow-lg flex h-full flex-col gap-4 md:gap-0 md:flex-row relative md:items-center rounded-md p-4 md:p-8 lg:max-w-2xl w-full border-t-[2px] border-teal-500 px-4 overflow-hidden">
          <div className="flex flex-col">
            <h2 className="md:text-lg text-nowrap font-bold text-neutral-500 md:text-left">Coca en Chachos</h2>
          </div>
          <div className="flex flex-row gap-2 md:gap-4 md:ml-8 w-full justify-end">
            <h2 className="text-neutral-500">2.25Lts</h2>
            <p className="text-teal-600 text-nowrap font-bold"><span id="tourist-rate">$ {(averagePrice).toFixed(2)}</span></p>
          </div>
        </div>
        <div className="bg-white shadow-lg flex h-full flex-col gap-4 md:gap-0 md:flex-row relative md:items-center rounded-md p-4 md:p-8 lg:max-w-2xl w-full border-t-[2px] border-teal-500 px-4 overflow-hidden">
          <div className="flex flex-col">
            <h2 className="md:text-lg text-nowrap font-bold text-neutral-500 md:text-left">Coca Turista</h2>
          </div>
          <div className="flex flex-row gap-2 md:gap-4 md:ml-8 w-full justify-end">
            <h2 className="text-neutral-500 ">2.25Lts</h2>
            <p className="text-teal-600 text-nowrap font-bold"><span id="tourist-rate">u$s {(averagePrice/1500).toFixed(2)}</span></p>
          </div>
        </div>
      </div>
    </div>  
  );
}