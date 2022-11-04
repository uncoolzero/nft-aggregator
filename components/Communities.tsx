import data from "../data/data"

function Communities() {

return(
    <div className="bg-slate-800 w-full text-3xl flex flex-col rounded-lg md:flex-row md:content-center">
        <div className="w-full px-8 md:place-content-center rounded-lg md:flex md:flex-col md:px-0 bg-slate-800">
            <div className="place-self-center text-3xl  text-center mt-4">Create your own Community</div>
            <div className="place-self-center text-base text-center mt-4">
                <a className="underline decoration-dotted underline-offset-4 cursor-pointer hover:text-blue-400">Terms and Conditions</a> apply</div>
            <div className="bg-blue-500 rounded-lg place-self-center my-4 text-lg px-8 py-2 text-center">Create Community</div>
        </div>
        <div className="hidden md:flex w-24 -mr-8 rounded-l-lg bg-gradient-to-r z-10 from-slate-800" />
        <div className="flex flex-row overflow-x-scroll scrollbar-hide mx-2 mb-6 pl-4 pr-4 snap-x snap-mandatory gap-x-8 md:gap-x-4 md:pt-6 md:w-[170%] lg:w-[250%]">
        {data.map((data) =>
            <div className={`min-w-full md:min-w-[47%] lg:min-w-[32%] bg-cover bg-center rounded-lg overflow-clip`} style={{backgroundColor: `rgb(${data.color})`}}>
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
    </div>
)

}


export default Communities