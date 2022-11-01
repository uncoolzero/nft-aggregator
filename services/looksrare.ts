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

export default async function looksrareTrending()
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
              trades {
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
            floorValueFixed = (+Number(ethers.utils.formatEther(floorValueRaw)).toFixed(4)).toString()
        }

        var idAlreadyExists = false


        //GraphQL can return multiple entries for the same collection, this checks if we already got this collection's info,
        //and if it is newer than what's already stored.
        if (i > 0)
        {
            for (let u = 0; u < formattedTrending.length; u++)
            {
                //@ts-ignore
                if (trending[i].id === formattedTrending[u].id)
                {
                    //@ts-ignore
                    if (formattedTrending[u].dateStamp < dateStamp)
                    {
                        formattedTrending[u] = {
                            name: collectionInfo.data.name,
                            id: trending[i].id,
                            dateStamp: dateStamp,
                            image: collectionImage.data.imageURI,
                            totalSupply: collectionStats.data.totalSupply,
                            floorPrice: floorValueFixed,
                            floorChange24h: collectionStats.data.floorChange24h,
                            dailyTradeVolumeETH: trending[i].dailyTradeVolumeETH,
                            dailyTradedItemCount: trending[i].dailyTradedItemCount,
                        }

                        idAlreadyExists = true

                        break
                    }
                    else
                    {
                        formattedTrending.push({
                            name: collectionInfo.data.name,
                            id: trending[i].id,
                            dateStamp: dateStamp,
                            image: collectionImage.data.imageURI,
                            totalSupply: collectionStats.data.totalSupply,
                            floorPrice: floorValueFixed,
                            floorChange24h: collectionStats.data.floorChange24h,
                            dailyTradeVolumeETH: trending[i].dailyTradeVolumeETH,
                            dailyTradedItemCount: trending[i].dailyTradedItemCount,
                        })

                        idAlreadyExists = true

                        break
                    }
                }
            }
        }

        if (!idAlreadyExists)
        {
            formattedTrending.push({
                name: collectionInfo.data.name,
                id: trending[i].id,
                dateStamp: dateStamp,
                image: collectionImage.data.imageURI,
                totalSupply: collectionStats.data.totalSupply,
                floorPrice: floorValueFixed,
                floorChange24h: collectionStats.data.floorChange24h,
                dailyTradeVolumeETH: trending[i].dailyTradeVolumeETH,
                dailyTradedItemCount: trending[i].dailyTradedItemCount,
            })
        }

    }

    console.log(formattedTrending)

    const filteredTrending = formattedTrending.filter(filterZeroFloorAndImages)
    
    return filteredTrending
}
