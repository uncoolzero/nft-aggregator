import React, { useEffect, useState } from 'react'

interface Props {
  trends: Array<{
    name: string;
    id: string;
    image: string;
    thumbnail?: string;
    banner?: string;
    description?: string;
    totalSupply: number;
    floorPrice: string;
    floorChange24h: number;
    dailyTradeVolumeETH: string;
    dailyTradedItemCount: number;}>
}

function Trending({trends}: Props) {

  return (
    //@ts-ignore

    <div className="flex flex-row overflow-x-scroll snap-x snap-mandatory scrollbar-hide">
      {trends.map((trends) => 
      <div id={trends.name} key={trends.id} className="relative min-w-full snap-center mx-8 aspect-square rounded-[1.75rem] overflow-hidden border-black/20">
        <div className="absolute w-full min-w-full aspect-square rounded-[1.75rem] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/40 z-[1]">
          <div className="absolute bottom-4 font-bold left-0 pl-4 pb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] z-[2]">
            {trends.name}
          </div>
          <div className="absolute bottom-0 text-sm  left-0 pl-4 pb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] z-[2]">
            Floor: {trends.floorPrice} ETH
          </div>
        </div>
        <div className="relative max-w-full aspect-square border rounded-[1.75rem] bg-origin-border bg-no-repeat transition-all bg-center hover:scale-125 duration-500 ease-in-out border-black/20 text-white bg-cover" style={{backgroundImage: `url(${trends.image})`}}>
      </div>
    </div>
    )}


    </div>
    )

}

export default Trending