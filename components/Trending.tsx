import React, { useEffect, useState, useRef } from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { useTheme } from '../lib/ThemeContext'
import { translations } from '../data/lang'

interface Props {
  trends: Array<{
    name: string;
    id: string;
    dateStamp: string;
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

  const { language, setLanguage } = useTheme()
  const scrollCarousel = useRef(null)

  function getTranslation(lang:string, text:string) {

    if (language)
    {
    //@ts-ignore
    return translations![lang][text]
    }
    
  }

  function scrollLeft() {

    var carousel = document.getElementById("scrollCarousel")

    carousel?.scrollBy({ left: -400, behavior: "smooth"})

    console.log(carousel?.scrollLeft, carousel?.clientWidth, carousel?.scrollWidth)

  }

  function scrollRight() {

    var carousel = document.getElementById("scrollCarousel")

    carousel?.scrollBy({ left: 400, behavior: "smooth"})

  }

  function handleScroll() {

    var carousel = document.getElementById("scrollCarousel")
    var leftScroll = document.getElementById("leftScroll")
    var rightScroll = document.getElementById("rightScroll")

    if (carousel?.scrollLeft)
    {

        var maxScrollLeft = carousel.scrollWidth - carousel.clientWidth

        if (carousel.scrollLeft < 10)
        {
          if (leftScroll)
          {
            leftScroll.className = "trending-scroll-button-invisible left-2"
          }
        }
        else if (carousel.scrollLeft > maxScrollLeft - 10)
        {
          if (rightScroll)
          {
            rightScroll.className = "trending-scroll-button-invisible right-2"
          }
        }
        else
        {
          if (leftScroll && rightScroll)
          {
            leftScroll.className = "trending-scroll-button left-2"
            rightScroll.className = "trending-scroll-button right-2"
          }
        }

    }

  }

  useEffect(() => {
    const scroll = scrollCarousel.current

    // @ts-ignore: Object is possibly 'null'.
    scroll.addEventListener("scroll", handleScroll)

  }, [handleScroll])


  return (
    //@ts-ignore
    <div className="flex flex-row relative">
    <div id="leftScroll" onClick={scrollLeft} className="trending-scroll-button-invisible left-2"><MdNavigateBefore /></div>
    <div id="scrollCarousel" ref={scrollCarousel} className="flex flex-row overflow-x-scroll snap-x snap-mandatory w-full text-white scrollbar-hide">
      {trends.map((trends, index) =>
      index < 8 && (
      <div id={trends.name} key={trends.id} className="relative min-w-full lg:min-w-[46.5%] xl:min-w-[29.9%] 2xl:min-w-[22.9%] snap-center first:ml-0 first:mr-8 last:ml-8 2xl:first:mr-[1.3rem] 2xl:last:ml-[1.3rem] last:mr-0 mx-8 2xl:mx-[1.3rem] aspect-square rounded-[1.75rem] overflow-hidden border-black/20">
        <div className="absolute w-full min-w-full aspect-square rounded-[1.75rem] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/40 z-[1]">
          <div className="absolute bottom-4 md:bottom-8 font-bold md:text-4xl lg:text-xl lg:bottom-6 left-0 pl-4 pb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] z-[2]">
            {trends.name}
          </div>
          <div className="absolute bottom-0 text-sm md:text-3xl lg:text-lg left-0 pl-4 pb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] z-[2]">
            <div className="inline">{getTranslation(language!, "floor")}</div>: {trends.floorPrice} ETH
          </div>
        </div>
        <div className="relative max-w-full aspect-square border rounded-[1.75rem] bg-origin-border bg-no-repeat transition-all bg-center hover:scale-110 duration-500 ease-in-out border-black/20 bg-cover" style={{backgroundImage: `url(${trends.image})`}}>
      </div>
    </div>
    ))}
    </div>
    <div id="rightScroll" onClick={scrollRight} className="trending-scroll-button right-2"><MdNavigateNext /></div>
    </div>
    )


}

export default Trending