import { FaSearch } from 'react-icons/fa'
import { HiMenu } from "react-icons/hi"
import { CgProfile } from 'react-icons/cg'
import { IoWalletOutline } from 'react-icons/io5'


function Header() {

return (

  <header className="bg-[#0d1525]/90 backdrop-blur-xl sticky top-0 z-20 w-full px-6 py-4 font-bold text-lg gap-x-3 flex flex-row md:py-6 xl:py-4">
    <div className="basis-full place-self-center md:text-xl md:basis-1">NFTSITE</div>
    <div className="text-2xl transition-all ease-in-out duration-150 hover:bg-slate-600 focus-within:bg-slate-700 place-self-center md:place-items-center md:flex md:text-3xl xl:text-xl md:text-neutral-400 md:basis-full md:mx-4 md:bg-slate-800 md:rounded-md md:pl-3 md:py-3 xl:py-1">
      <FaSearch />
      <input type="text" placeholder='Search items and collections' className="hidden focus:outline-none placeholder:bg-transparent bg-transparent md:flex text-neutral-100 font-normal text-2xl pl-2 xl:text-xl place-self-center w-full"></input>
    </div>
    <div className="hidden place-items-center lg:flex gap-x-6">
        <button className="hidden xl:inline-block hover:bg-slate-600 px-2 py-1 rounded-md transition-all ease-in-out">Explore</button>
        <button className="hidden xl:inline-block hover:bg-slate-600 px-2 py-1 rounded-md transition-all ease-in-out">Stats</button>
        <button className="hidden xl:inline-block hover:bg-slate-600 px-2 py-1 rounded-md transition-all ease-in-out">Resources</button>
        <button className="hidden xl:inline-block hover:bg-slate-600 px-2 py-1 rounded-md transition-all ease-in-out">Create</button>
        <button className="text-4xl xl:text-3xl hover:text-slate-300 rounded-md transition-all ease-in-out"><CgProfile /></button>
        <button className="text-4xl xl:text-3xl hover:text-slate-300 rounded-md transition-all ease-in-out"><IoWalletOutline /></button>
      </div>
    <div className="text-3xl place-self-center md:text-4xl xl:hidden lg:pl-4"><HiMenu /></div>
  </header>

)

}

export default Header