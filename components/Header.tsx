import { AiFillHeart } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { FaSearch, FaMusic, FaCamera, FaPeopleCarry, FaBlog, FaRegNewspaper } from 'react-icons/fa'
import { GiCardExchange, GiWorld, GiPodium } from 'react-icons/gi'
import { GoBrowser } from 'react-icons/go'
import { HiMenu, HiStatusOnline } from "react-icons/hi"
import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { CgProfile, CgMenuGridR, CgDarkMode } from 'react-icons/cg'
import { IoWalletOutline, IoLibrarySharp, IoShareSocialSharp, IoSettingsSharp, IoLanguage } from 'react-icons/io5'
import { MdOutlineExplore, MdNavigateNext, MdToys, MdSportsSoccer, MdMonetizationOn, MdPerson } from 'react-icons/md'
import { TbActivity } from 'react-icons/tb'
import { TfiStatsUp } from 'react-icons/tfi'
import { BsStars, BsBook, BsFillPaletteFill, BsTools, BsFillEyeFill } from 'react-icons/bs'
import { FaRedditAlien, FaTwitter, FaDiscord, FaBookReader } from "react-icons/fa"
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

    <header className="dark:bg-[#0d1525]/90 bg-[#f1f3f5] backdrop-blur-xl sticky top-0 z-20 w-full h-[300%] flex flex-col">
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
            <div className="group relative">
              <button className="hidden xl:inline-block group-hover:bg-slate-700/50 dark:group-hover:bg-slate-600 group-hover:text-white px-2 py-1 rounded-md transition-all ease-in-out">Explore</button>
              <div className="dropdown-group">
                <button className="dropdown-button dropdown-borders-topbottom rounded-t-md border-b">
                  <div className="dropdown-button-icon"><HiOutlineSquares2X2 /></div>All NFTs</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><BsFillPaletteFill /></div>Art</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><MdToys/></div>Collectibles</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><GoBrowser /></div>Domain Names</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><FaMusic /></div>Music</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><FaCamera /></div>Photography</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><MdSportsSoccer /></div>Sports</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><GiCardExchange /></div>Trading Cards</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><BsTools /></div>Utility</button>
                <button className="dropdown-button dropdown-borders-topbottom rounded-b-md border-t">
                  <div className="dropdown-button-icon"><GiWorld /></div>Virtual Worlds</button>
              </div>
            </div>
            <div className="group relative">
              <button className="hidden xl:inline-block hover:bg-slate-700/50 dark:hover:bg-slate-600 hover:text-white px-2 py-1 rounded-md transition-all ease-in-out">Stats</button>
              <div className="dropdown-group">
                <button className="dropdown-button dropdown-borders-topbottom rounded-t-md border-b">
                  <div className="dropdown-button-icon"><GiPodium /></div>Rankings</button>
                <button className="dropdown-button dropdown-borders-topbottom rounded-b-md border-t">
                  <div className="dropdown-button-icon"><TbActivity /></div>Activity</button>
              </div>
            </div>
            <div className="group relative">
              <button className="hidden xl:inline-block hover:bg-slate-700/50 dark:hover:bg-slate-600 hover:text-white px-2 py-1 rounded-md transition-all ease-in-out">Resources</button>
              <div className="dropdown-group">
                <button className="dropdown-button dropdown-borders-topbottom rounded-t-md border-b">
                  <div className="dropdown-button-icon"><FaBookReader /></div>Learn</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><BiHelpCircle /></div>Help Center</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><HiStatusOnline /></div>Platform Status</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><FaPeopleCarry /></div>Partners</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><MdMonetizationOn /></div>Taxes</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><FaBlog /></div>Blog</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><IoLibrarySharp /></div>Docs</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><FaRegNewspaper /></div>Newsletter</button>
                <div className="flex flex-row px-4 py-4 text-white dark:bg-slate-600 bg-[#9299a4] dropdown-borders-topbottom rounded-b-md border-t transition-all ease-in-out">
                  <div className="w-full flex justify-evenly">
                    <button className="p-2 -m-2 hover:bg-orange-500 hover:text-white transition-colors ease-in-out rounded-md"><FaRedditAlien /></button>
                    <button className="p-2 -m-2 hover:bg-blue-500 hover:text-white transition-colors ease-in-out rounded-md"><FaTwitter /></button>
                    <button className="p-2 -m-2 hover:bg-[#5865F2] hover:text-white transition-colors ease-in-out rounded-md"><FaDiscord /></button>
                  </div></div>
              </div>
            </div>
            <button className="hidden xl:inline-block hover:bg-slate-700/50 dark:hover:bg-slate-600 hover:text-white px-2 py-1 rounded-md transition-all ease-in-out">Create</button>
            <div className="group relative">
              <button className="text-4xl xl:text-3xl hover:bg-slate-700/50 dark:hover:bg-slate-600 hover:text-white rounded-md align-middle px-2 py-1 -mx-2 -my-1 transition-all ease-in-out"><CgProfile /></button>
              <div className="dropdown-group-profile">
                <button className="dropdown-button dropdown-borders-topbottom rounded-t-md border-b">
                  <div className="dropdown-button-icon"><MdPerson /></div>Profile</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><AiFillHeart /></div>Favourites</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><BsFillEyeFill /></div>Watchlist</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><CgMenuGridR /></div>My Collections</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><IoSettingsSharp /></div>Settings</button>
                <button className="dropdown-button dropdown-borders">
                  <div className="dropdown-button-icon"><IoLanguage /></div>Language</button>
                <button className="dropdown-button dropdown-borders-topbottom rounded-b-md border-t">
                  <div className="dropdown-button-icon"><CgDarkMode /></div>Night Mode</button>
              </div>
            </div>
            <button className="text-4xl xl:text-3xl hover:bg-slate-700/50 dark:hover:bg-slate-600 hover:text-white rounded-md align-middle px-2 py-1 -mx-2 -my-1 transition-all ease-in-out"><IoWalletOutline /></button>
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
            <button className="bg-blue-600 px-16 py-2 rounded-lg hover:bg-blue-500 text-white transition-all ease-in-out text-xl">Connect Wallet</button> 
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