import { request, gql } from "graphql-request"
import { BigNumber, ethers } from "ethers"

const apiAddress = "https://api.thegraph.com/subgraphs/name/messari/opensea-seaport-ethereum"

export default async function openseaTrending()
{
    const trendingQuery = gql 
    `
    {
        collectionDailySnapshots(
          first: 10
          orderBy: dailyTradeVolumeETH
          orderDirection: desc
          where: {timestamp_gte: "1666946999", royaltyFee_gt: "0"}
        ) {
          id
          dailyTradeVolumeETH
          dailyTradedItemCount
        }
      }
    `

    const dailySnapshot = await request(apiAddress, trendingQuery)
    
    const trending = dailySnapshot.collectionDailySnapshots

    for (let i = 0; i < trending.length; i++) 
    {

        trending[i].id = trending[i].id.substring(0, 42)

        var collectionInfo = await (await fetch(`https://api.opensea.io/api/v1/asset_contract/${trending[i].id}?format=json`)).json()

        var slug = collectionInfo.collection.slug

        var collectionData = await (await fetch(`https://api.opensea.io/api/v1/collection/${slug}?format=json`)).json()

        trending[i] = {
            name: collectionInfo.collection.name,
            id: trending[i].id,
            image: collectionInfo.collection.featured_image_url,
            totalSupply: collectionData.collection.stats.total_supply,
            floorPrice: collectionData.collection.stats.floor_price,
            floorChange24h: collectionData.collection.stats.one_day_change,
            dailyTradeVolumeETH: trending[i].dailyTradeVolumeETH,
            dailyTradedItemCount: trending[i].dailyTradedItemCount,
        }

    }


    return trending
    
}