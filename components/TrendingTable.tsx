import React, { useEffect, useState } from 'react'
import useWindowDimensions from "../hooks/useWindowDimensions"

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

function ThumbnailImage({trends}: Props) {
    //@ts-ignore
    if (trends.thumbnail)
    {
        return (
            //@ts-ignore
            <div className="w-12 lg:w-16 aspect-square rounded-md bg-origin-border bg-no-repeat transition-all bg-center border-black/20 text-white bg-cover" style={{backgroundImage: `url(${trends.thumbnail})`}} />
        )
    }
    else
    {
        return (
            //@ts-ignore
            <div className="w-12 lg:w-16 aspect-square rounded-md bg-origin-border bg-no-repeat transition-all bg-center border-black/20 text-white bg-cover" style={{backgroundImage: `url(${trends.image})`}} />
        )
    }
}

function Table({trends}: Props) {

    const { width, height } = useWindowDimensions()

    var widthIndex: number

    if (width != null)
    {
        if (width < 1024)
        {
            widthIndex = 5
        }
        else
        {
            widthIndex = 10
        }
    }

    return (
        <div className="grid grid-cols-1 w-full lg:grid-rows-5 lg:grid-cols-2 lg:grid-flow-col lg:gap-x-8 ">      
        {trends.map((trends, index) => 
            index < widthIndex && (
            <div key={trends.id} className="text-xs md:text-sm flex py-2 border-b border-white/20">
                <div>
                    {/*@ts-ignore*/}
                    <ThumbnailImage trends={trends}/>
                </div>
                <div className="pl-2 place-self-center flex flex-col text-ellipsis truncate grow">
                    <div className="text-base md:text-lg lg:text-xl font-bold text-ellipsis truncate pr-2">{trends.name}</div>
                    <div className="flex space-x-1 lg:text-base text-neutral-400"> 
                        <div>Floor:</div>
                        <div className="font-bold">{trends.floorPrice} ETH</div>
                        {/*@ts-ignore */}
                        <FloorChange trends={trends}/> 
                    </div>
                </div>
                <div className="place-self-center shrink-0 font-bold text-xl md:text-2xl">{Number(trends.dailyTradeVolumeETH).toFixed(1)} ETH</div>
            </div>
                ))}
        </div>
    )

}

function TrendingTable({trends}: Props) {

    return (
        <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 gap-y-2 -mt-8"> 
            <div className="text-xs md:text-sm flex w-full justify-between text-neutral-400 font-bold">
                    <div className="place-self-center capitalize">COLLECTION</div>
                    <div className="place-self-center capitalize">VOLUME</div>
            </div>
            <div className="hidden text-xs md:text-sm lg:flex w-full justify-between text-neutral-400 font-bold">
                    <div className="place-self-center capitalize">COLLECTION</div>
                    <div className="place-self-center capitalize">VOLUME</div>
            </div>
            </div>
        <Table trends={trends} />        
        </div>
    )

}

export default TrendingTable