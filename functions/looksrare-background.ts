import { request, gql } from "graphql-request"
import { BigNumber, ethers } from "ethers"
import timestamp from "../services/timestamp"
import getRandomInt from "../services/getrandomint"

const apiAddress = "https://api.thegraph.com/subgraphs/name/messari/looksrare-ethereum"

function filterZeroFloorAndImages(item: any) {
    if (item.floorPrice === "0" || item.image === "")
    {
        return false
    }

    return true
}

async function looksrareTrending()
{

    var time = timestamp()

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
            trades(first: 10, orderBy: timestamp, orderDirection: desc) {
                tokenId
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

        var collectionInfo = await (await fetch(`https://api.looksrare.org/api/v1/collections?address=${trending[i].id}`)).json()
        var collectionStats = await (await fetch(`https://api.looksrare.org/api/v1/collections/stats?address=${trending[i].id}`)).json();
        var collectionImage = await (await fetch(`https://api.looksrare.org/api/v1/tokens?collection=${trending[i].id}&tokenId=${trending[i].collection.trades[0].tokenId}`)).json()

        var floorValueRaw
        var floorValueFixed

        if (collectionStats.data.floorPrice === null)
        {
            floorValueFixed = "0"
        }
        else
        {
            floorValueRaw = BigNumber.from(collectionStats.data.floorPrice)
            floorValueFixed = (+Number(ethers.utils.formatEther(floorValueRaw)).toFixed(4)).toString()
        }


        formattedTrending.push({
            name: collectionInfo.data.name,
            id: trending[i].id,
            dateStamp: dateStamp,
            image: collectionImage.data.imageURI,
            totalSupply: collectionStats.data.totalSupply,
            floorPrice: floorValueFixed,
            floorChange24h: collectionStats.data.floorChange24h,
            dailyTradeVolumeETH: trending[i].dailyTradeVolumeETH,
            dailyTradedItemCount: 0,
        })

    }

    const filteredTrending = formattedTrending.filter(filterZeroFloorAndImages)
    
    return filteredTrending
}

module.exports = {looksrareTrending}