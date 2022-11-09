import { FaSearch } from 'react-icons/fa'
import { HiMenu } from "react-icons/hi"
import { CgProfile } from 'react-icons/cg'
import { IoWalletOutline } from 'react-icons/io5'

function searchButtonClick() {

var searchbar = document.getElementById("searchbar")
var logo = document.getElementById("logo")
var menu = document.getElementById("hamburgermenu")
var input = document.getElementById("searchbox")

if (searchbar)
{
  if (searchbar.className == "search-closed")
  {
    searchbar.className = "search-open"
    //@ts-ignore
    logo.className = "logo-search-open"
    //@ts-ignore
    menu.className = "menu-search-open"
    //@ts-ignore
    input.className = "input-search-open"
  }
  else
  {
    searchbar.className = "search-closed"
    //@ts-ignore
    logo.className = "logo-search-closed"
    //@ts-ignore
    menu.className = "menu-search-closed"
    //@ts-ignore
    input.className = "input-search-closed"
  }
}

}

function Header() {

return (

  <header className="bg-[#0d1525]/90 backdrop-blur-xl sticky top-0 z-20 w-full px-6 py-4 font-bold text-lg gap-x-3 flex flex-row md:py-6 xl:py-4">
    <div id="logo" className="logo-search-closed">NFTSITE</div>
    <div id="searchbar" className="search-closed">
      <div onClick={searchButtonClick} className="md:hidden">
      <FaSearch />
      </div>
      <div className="hidden md:flex">
      <FaSearch />
      </div>
      <input id="searchbox" type="text" placeholder='Search items and collections' className="input-search-closed"></input>
    </div>
    <div className="hidden place-items-center lg:flex gap-x-6">
        <button className="hidden xl:inline-block hover:bg-slate-600 px-2 py-1 rounded-md transition-all ease-in-out">Explore</button>
        <button className="hidden xl:inline-block hover:bg-slate-600 px-2 py-1 rounded-md transition-all ease-in-out">Stats</button>
        <button className="hidden xl:inline-block hover:bg-slate-600 px-2 py-1 rounded-md transition-all ease-in-out">Resources</button>
        <button className="hidden xl:inline-block hover:bg-slate-600 px-2 py-1 rounded-md transition-all ease-in-out">Create</button>
        <button className="text-4xl xl:text-3xl hover:text-slate-300 rounded-md transition-all ease-in-out"><CgProfile /></button>
        <button className="text-4xl xl:text-3xl hover:text-slate-300 rounded-md transition-all ease-in-out"><IoWalletOutline /></button>
      </div>
    <div id="hamburgermenu" className="menu-search-closed"><HiMenu /></div>
  </header>

)

}

export default Header