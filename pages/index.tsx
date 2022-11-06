import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Trending from '../components/Trending';
import styles from '../styles/Home.module.css'
import getMainPageData from '../services/getMainPageData';
import TrendingTable from '../components/TrendingTable'
import { FaRedditAlien, FaTwitter, FaDiscord } from "react-icons/fa"
import Communities from '../components/Communities';
import Header from '../components/Header';

interface Propping {
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

export default function Home({trends}: Propping) {
  return (
    <div className="font-inter">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="fixed left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-slate-900 to-black">
      </div>
      
      <main className="px-6 flex flex-col gap-y-12 md:text-xl z-10">

        <h1 className="font-bold text-5xl pt-6 z-10">
          <div className="text-center drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">Explore and discover NFTs</div>
        </h1>

        <h2 className="font-semibold text-lg z-10">
          <Trending trends={trends} />
        </h2>

        <div className="z-10 flex font-bold text-xl md:text-2xl lg:text-3xl justify-center">Now Trending</div>

        <h3 className="z-10">
          <TrendingTable trends={trends} />
        </h3>
        
        <div className="rounded-md bg-slate-600/20 hover:bg-slate-600/40 hover:cursor-pointer p-2 text-white lg:max-w-[50%] shadow-md w-10/12 self-center z-10 transition-all ease-in-out">
          <div className="flex items-center justify-center">Explore all collections</div>
        </div>

        <div className="z-10">
          <Communities />
        </div>

        <div className="z-10 py-16 relative">
          <div className="md:grid md:grid-cols-2">
            <div className="place-self-center md:pl-16 lg:pl-24 xl:pl-36 relative z-20">
              <div className="text-4xl xl:text-5xl font-bold">
              Earn up to <span className="bg-gradient-to-r from-red-500 via-green-500 to-blue-500 animate-text bg-clip-text text-transparent">9000.12%</span> APY with COIN
              </div>
              <br />
              <div className="">
              Stake COIN to <span className="font-bold">earn a share of daily trading fees</span> in WETH, and even more COIN.
              </div>
              <br />
              <button className="px-6 py-4 bg-slate-700 rounded-lg hover:bg-slate-500 transition-all ease-in-out">
              Learn More
              </button>
            </div>
            <div className="place-self-center absolute top-0 -right-5 xl:-right-10 overflow-clip lg:overflow-visible md:relative">
              <img className="-scale-[0.9] md:-scale-[1] lg:-scale-[1.3] rotate-[30deg] grayscale md:contrast-50 opacity-25 md:opacity-50" src="../coin.svg"/>
            </div>
          </div>
        </div>

        <div className="bg-slate-600/20 pb-4 rounded-md shadow-md z-10 lg:min-w-[50%] lg:self-center">
          <div className="font-semibold flex justify-center items-center pt-2 pb-4">Join the community</div>
          <div className="flex flex-row justify-evenly">
            <button className="p-2 text-4xl md:text-5xl rounded-md bg-slate-200/20 hover:bg-[#5865F2] transition-all ease-in-out shadow-md"><FaDiscord /></button>
            <button className="p-2 text-4xl md:text-5xl rounded-md bg-slate-200/20 hover:bg-blue-500 transition-all ease-in-out shadow-md"><FaTwitter /></button>
            <button className="p-2 text-4xl md:text-5xl rounded-md bg-slate-200/20 hover:bg-orange-500 transition-all ease-in-out shadow-md"><FaRedditAlien /></button>
          </div>
        </div>

        <div className="grid grid-cols-4 justify-items-center gap-y-4 z-10 lg:w-[50%] lg:self-center">
          <button className="hover:bg-slate-700/50 px-2 py-1 rounded-md transition-all ease-in-out">About</button>
          <button className="hover:bg-slate-700/50 px-2 py-1 rounded-md transition-all ease-in-out">API</button>
          <button className="hover:bg-slate-700/50 px-2 py-1 rounded-md transition-all ease-in-out">Contact</button>
          <button className="hover:bg-slate-700/50 px-2 py-1 rounded-md transition-all ease-in-out">Careers</button>
          <button className="hover:bg-slate-700/50 px-2 py-1 rounded-md transition-all ease-in-out">Docs</button>
          <button className="hover:bg-slate-700/50 px-2 py-1 rounded-md transition-all ease-in-out">Help</button>
          <button className="hover:bg-slate-700/50 px-2 py-1 rounded-md transition-all ease-in-out">Newsletter</button>
          <button className="hover:bg-slate-700/50 px-2 py-1 rounded-md transition-all ease-in-out">Terms</button>
        </div>

        <div className="border-t-[1px] flex flex-col py-4 justify-center items-center z-10 lg:w-[75%] lg:self-center">
          <div>NFTSITE - 2022</div>
          <div>An @uncoolzero industries product</div>
        </div>
      </main>

    </div>
  )
}

//@ts-ignore
export const getStaticProps = async() => {

  const trends = await getMainPageData()

  return {
    props: {
      trends
    }
  }
}
