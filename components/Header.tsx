import { FaSearch } from 'react-icons/fa'
import { HiMenu } from "react-icons/hi"
import { CgProfile } from 'react-icons/cg'
import { IoWalletOutline } from 'react-icons/io5'
import { MdOutlineExplore, MdNavigateNext } from 'react-icons/md'
import { TfiStatsUp } from 'react-icons/tfi'
import { BsStars, BsBook } from 'react-icons/bs'
import { FaRedditAlien, FaTwitter, FaDiscord } from "react-icons/fa"
import { useTheme } from '../lib/ThemeContext'
import { useEffect } from 'react'




function Header() {

  const { darkMode, setDarkMode } = useTheme()
  const { menuOpen, setMenuOpen} = useTheme()

  function toggleMenu() {

    var menu = document.getElementById("menu")
  
    if (menu)
    {
      if (menu.className == "menu-on")
      {
        menu.className = "menu-off"
        setMenuOpen(false)
      }
      else
      {
        menu.className = "menu-on"
        setMenuOpen(true)
      }
    }
  }
  
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    console.log("changing dark mode -", darkMode)
  }

  useEffect(() => { setDarkMode(!darkMode) }, [])

return (

    <header className="bg-[#0d1525]/90 backdrop-blur-xl sticky top-0 dark:backdrop-blur-sm z-20 w-full h-[300%] flex flex-col">
      <div className="px-6 py-4 font-bold text-lg gap-x-3 flex flex-row md:py-6 xl:py-4">
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
        <div id="hamburgermenu" onClick={toggleMenu} className="menu-search-closed"><HiMenu /></div>
      </div>
      <div id="menu"className="menu-off">
        <div className="text-3xl h-[90%] grid grid-rows-[repeat(8,_minmax(0,_1fr))]">
          <div className="menu-rows">
            <div className="menu-rows-icon">
              <MdOutlineExplore />
            </div>
            <div className="menu-rows-description">Explore
            </div>
            <div className="menu-rows-arrow">
              <MdNavigateNext />
            </div>
          </div>
          <div className="menu-rows">
            <div className="menu-rows-icon">
              <TfiStatsUp />
            </div>
            <div className="menu-rows-description">Stats
            </div>
            <div className="menu-rows-arrow">
              <MdNavigateNext />
            </div>
          </div>
          <div className="menu-rows">
            <div className="menu-rows-icon">
              <BsBook />
            </div>
            <div className="menu-rows-description">Resources
            </div>
            <div className="menu-rows-arrow">
              <MdNavigateNext />
            </div>
          </div>
          <div className="menu-rows">
            <div className="menu-rows-icon">
              <BsStars />
            </div>
            <div className="menu-rows-description">Create
            </div>
            <div className="menu-rows-arrow">
              <MdNavigateNext />
            </div>
          </div>
          <div className=""></div>
          <div className="menu-rows hover:bg-transparent">
            <div className="menu-rows-description">Night Mode</div>
            <div onClick={toggleDarkMode} className="bg-white rounded-full h-8 w-[4.5rem] place-self-center">
              <div className="night-mode-selector" />
            </div>
            
          </div>
          <div className="menu-rows place-self-center hover:bg-transparent">
            <button className="bg-blue-600 px-16 py-2 rounded-lg hover:bg-blue-500 transition-all ease-in-out text-xl">Connect Wallet</button> 
          </div>
          <div className="menu-rows bg-black/10 flex justify-evenly">
            <div className="menu-rows-socialmedia"><FaRedditAlien /></div>
            <div className="menu-rows-socialmedia"><FaTwitter /></div>
            <div className="menu-rows-socialmedia"><FaDiscord /></div>
          </div>
        </div>
    </div>
    </header>

)

}

export default Header