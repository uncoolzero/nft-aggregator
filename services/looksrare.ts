import { request, gql } from "graphql-request"
import { BigNumber, ethers } from "ethers"
import timestamp from "../services/timestamp"

const apiAddress = "https://api.thegraph.com/subgraphs/name/messari/looksrare-ethereum"

function getRandomInt(max: number) {
    return Math.floor((Math.random() * max) + 1)
}

function filterZeroFloorAndImages(item: any) {
    if (item.floorPrice === "0" || item.image === "")
    {
        console.log("filtered!", item)
        return false
    }

    console.log("unfiltered!", item)
    return true
}

export default async function looksrareTrending()
{

    var time = timestamp()

    console.log(time)

    const trendingQuery = gql 
    `
    {
        collectionDailySnapshots(
            first: 10
            orderBy: dailyTradeVolumeETH
            orderDirection: desc
            where: {timestamp_gte: ${time}, royaltyFee_gt: "0"}
          ) {
            id
            dailyTradeVolumeETH
            dailyTradedItemCount
            collection {
              trades {
                tokenId
              }
            }
          }
        }
    `

    const dailySnapshot = await request(apiAddress, trendingQuery)
    
    const trending = dailySnapshot.collectionDailySnapshots

    for (let i = 0; i < trending.length; i++) 
    {
        trending[i].id = trending[i].id.substring(0, 42)

        var collectionInfo = await (await fetch(`https://api.looksrare.org/api/v1/collections?address=${trending[i].id}`)).json()
        var collectionStats = await (await fetch(`https://api.looksrare.org/api/v1/collections/stats?address=${trending[i].id}`)).json();
        var collectionImage = await (await fetch(`https://api.looksrare.org/api/v1/tokens?collection=${trending[i].id}&tokenId=${trending[i].collection.trades[getRandomInt(trending[i].collection.trades.length)].tokenId}`)).json()

        var floorValueRaw
        var floorValueFixed

        if (collectionStats.data.floorPrice === null)
        {
            floorValueFixed = "0"
        }
        else
        {
            floorValueRaw = BigNumber.from(collectionStats.data.floorPrice)
            floorValueFixed = ethers.utils.formatEther(floorValueRaw)
        }
        
        trending[i] = {
            name: collectionInfo.data.name,
            id: trending[i].id,
            image: collectionImage.data.imageURI,
            totalSupply: collectionStats.data.totalSupply,
            floorPrice: floorValueFixed,
            floorChange24h: collectionStats.data.floorChange24h,
            dailyTradeVolumeETH: trending[i].dailyTradeVolumeETH,
            dailyTradedItemCount: trending[i].dailyTradedItemCount,
        }

    }

    const filteredTrending = trending.filter(filterZeroFloorAndImages)
    
    return filteredTrending
}
