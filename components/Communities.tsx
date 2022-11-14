import data from "../data/data"
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { useEffect, useRef } from 'react'

function Communities() {

    const communityCarousel = useRef(null)
  
    function handleScroll() {
  
      var carousel = document.getElementById("communityCarousel")
      var leftScroll = document.getElementById("leftScrollCommunity")
      var rightScroll = document.getElementById("rightScrollCommunity")
  
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

    function scrollLeft() {

        var carousel = document.getElementById("communityCarousel")
    
        carousel?.scrollBy({ left: -300, behavior: "smooth"})
    
    }
    
    function scrollRight() {

    var carousel = document.getElementById("communityCarousel")

    carousel?.scrollBy({ left: 300, behavior: "smooth"})

    }

    useEffect(() => {
        const scroll = communityCarousel.current
    
        // @ts-ignore: Object is possibly 'null'.
        scroll.addEventListener("scroll", handleScroll)
    
      }, [handleScroll])

return(
    <div className="dark:bg-slate-800 bg-slate-300 w-full text-3xl flex flex-col rounded-lg md:flex-row md:content-center">
        <div className="w-full px-8 md:mx-2 place-content-center rounded-lg md:flex md:flex-col md:px-0">
            <div className="place-self-center text-3xl  text-center mt-4">Create your own Community</div>
            <div className="place-self-center text-base text-center mt-4">
                <a className="underline decoration-dotted underline-offset-4 cursor-pointer hover:text-blue-400 transition-all ease-in-out">Terms and Conditions</a> apply</div>
            <button className="bg-blue-500 hover:bg-blue-400 transition-all ease-in-out rounded-lg w-full md:w-[90%] place-self-center my-4 text-lg px-8 py-2 text-center text-white shadow-md">Create Community</button>
        </div>
        <div className="hidden md:flex w-24 -mr-8 rounded-l-lg bg-gradient-to-r z-10 dark:from-slate-800 from-slate-300" />
        <div className="flex flex-row relative w-full md:w-[70%]">
            <div id="leftScrollCommunity" onClick={scrollLeft} className="trending-scroll-button-invisible left-2"><MdNavigateBefore /></div>    
            <div id="communityCarousel" ref={communityCarousel} className="flex flex-row overflow-x-scroll scrollbar-hide mx-2 mb-6 pl-4 pr-4 snap-x snap-mandatory gap-x-8 md:gap-x-4 md:pt-6 md:w-[170%] lg:w-[250%]">
            {data.map((data) =>
                <div key={data.name} className={`min-w-full md:min-w-[47%] lg:min-w-[32%] bg-cover bg-center rounded-lg overflow-clip`} style={{backgroundColor: `rgb(${data.color})`}}>
                        <div className={`px-4 py-4 snap-center rounded-lg`}>
                            <img className="rounded-lg w-full object-cover" src={data.image} />
                            <div className="text-lg text-white font-bold py-2">{data.name}</div>
                            <div className="text-sm h-36 md:h-44 text-white/80">{data.description}</div>
                            <div className="flex flex-row text-base gap-x-4">
                                <div className="border-r border-white/20 pr-4">
                                    <div className="text-white/80">Volume</div>
                                    <div className="text-white font-bold">{data.volume} ETH</div>
                                </div>
                                <div>
                                    <div className="text-white/80">Floor</div>
                                    <div className="text-white font-bold">{data.floorPrice} ETH</div>
                                </div>
                            </div>
                        </div>
                </div>
            )}
            </div>
            <div id="rightScrollCommunity" onClick={scrollRight} className="trending-scroll-button right-2"><MdNavigateNext /></div>
        </div>
    </div>
)

}


export default Communities