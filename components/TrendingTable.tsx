import React, { useEffect, useState } from 'react'

interface Props {
  trends: Array<{
    name: string;
    id: string;
    image: string;
    totalSupply: number;
    floorPrice: string;
    floorChange24h: number;
    dailyTradeVolumeETH: string;
    dailyTradedItemCount: number;}>
}

function FloorChange({trends}: Props) {

//@ts-ignore
if (trends.floorChange24h > 0) {
    return (
        //@ts-ignore
        <div className="text-green-400">{`(+${trends.floorChange24h}%)`}</div>
    )
}
//@ts-ignore
else if (trends.floorChange24h < 0) {
    return (
        //@ts-ignore
        <div className="text-red-400">{`(${trends.floorChange24h}%)`}</div>
    )
}
else {
    return (
        //@ts-ignore
        <div className=""></div>
    )
}

}

function TrendingTable({trends}: Props) {

    return (
        <div className="grid grid-flow-row gap-y-2 -mt-8"> 
        <div className="text-xs flex w-full justify-between text-neutral-400 font-bold">
                <div className="place-self-center">Collection</div>
                <div className="place-self-center">Volume</div>
        </div>         
        {trends.map((trends) => 
            <div className="text-xs flex w-full pb-2 border-b border-white/20">
                <div><div className="w-12 aspect-square rounded-md bg-origin-border bg-no-repeat transition-all bg-center border-black/20 text-white bg-cover" style={{backgroundImage: `url(${trends.image})`}} /></div>
                <div className="pl-2 place-self-center flex flex-col text-ellipsis truncate grow">
                    <div className="text-base font-bold text-ellipsis truncate">{trends.name}</div>
                    <div className="flex space-x-1 text-neutral-400"> 
                        <div>Floor:</div>
                        <div className="font-bold">{trends.floorPrice} ETH</div>
                        {/*@ts-ignore */}
                        <FloorChange trends={trends}/> 
                    </div>
                </div>
                <div className="place-self-center shrink-0 font-bold">{Number(trends.dailyTradeVolumeETH).toFixed(1)} ETH</div>
            </div>
                )}
        </div>
    )

}

export default TrendingTable