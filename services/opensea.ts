import { request, gql } from "graphql-request"
import { BigNumber, ethers } from "ethers"
import timestamp from "../services/timestamp"
import getRandomInt from "../services/getrandomint"
import { Description } from "@ethersproject/properties"
const API_KEY = process.env.API_KEY

const apiAddress = "https://api.thegraph.com/subgraphs/name/messari/opensea-seaport-ethereum"

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: API_KEY
  }
};

//c

export default async function openseaTrending()
{
    var time = timestamp()

    const trendingQuery = gql 
    `
    {
      collectionDailySnapshots(
        first: 20
        orderBy: dailyTradeVolumeETH
        orderDirection: desc
        where: {timestamp_gte: "${time}", royaltyFee_gt: "0"}
      ) {
        id
        dailyTradeVolumeETH
        dailyTradedItemCount
        collection {
          name
          nftStandard
          symbol
          sellerCount
          trades(first: 10, orderBy: timestamp, orderDirection: desc) {
            tokenId
            priceETH
          }
        }
      }
    }
    `

    const dailySnapshot = await request(apiAddress, trendingQuery)
    
    const trending = dailySnapshot.collectionDailySnapshots

    const formattedTrending = []

    for (let i = 0; i < trending.length; i++) 
    {

        var dateStamp = trending[i].id.substring(43, trending[i].id.length)
        trending[i].id = trending[i].id.substring(0, 42)

        await delay(200)
        //@ts-ignore
        var collectionInfo = await(await fetch(`https://api.nftport.xyz/v0/nfts/${trending[i].id}/${trending[i].collection.trades[getRandomInt(9)].tokenId}?chain=ethereum`, options)).json()
        var getNameFromLooksrare = await(await fetch(`https://api.looksrare.org/api/v1/collections?address=${trending[i].id}`)).json()

        var floorPrice = +Number(trending[i].collection.trades[0].priceETH).toFixed(4)
        
        if (collectionInfo.contract.metadata)
        {
          trending[i] = {
              name: getNameFromLooksrare.data.name,
              id: trending[i].id,
              dateStamp: dateStamp,
              image: collectionInfo.nft.cached_file_url,
              thumbnail: collectionInfo.contract.metadata.cached_thumbnail_url,
              banner: collectionInfo.contract.metadata.cached_banner_url,
              description: getNameFromLooksrare.data.description,
              totalSupply: "1",
              floorPrice: floorPrice,
              floorChange24h: "0",
              dailyTradeVolumeETH: trending[i].dailyTradeVolumeETH,
              dailyTradedItemCount: trending[i].dailyTradedItemCount,
          }
        }
        else
        {
          trending[i] = {
            name: getNameFromLooksrare.data.name,
            id: trending[i].id,
            dateStamp: dateStamp,
            image: collectionInfo.nft.cached_file_url,
            thumbnail: null,
            banner: null,
            description: null,
            totalSupply: "1",
            floorPrice: floorPrice,
            floorChange24h: "0",
            dailyTradeVolumeETH: trending[i].dailyTradeVolumeETH,
            dailyTradedItemCount: trending[i].dailyTradedItemCount,
        }
        }

    }

    return trending
    
}