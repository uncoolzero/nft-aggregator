import looksrareTrending from "./looksrare"
import openseaTrending from "./opensea"

export default async function getMainPageData() {
    
    let combinedList = []

    var looksRare = await looksrareTrending()

    console.log(looksRare)

    //Removing duplicate LooksRare entries
    for (let i = 0; i < looksRare.length; i++)
    {
        if (combinedList.length === 0)
        {
            combinedList.push(looksRare[i])
        }
        else
        {
            var itemAlreadyExists = false

            for (let u = 0; u < combinedList.length; u++)
            {
                if (looksRare[i].id === combinedList[u].id)
                {
                    if (Number(looksRare[i].dateStamp) > Number(combinedList[u].dateStamp))
                    {
                        itemAlreadyExists = !itemAlreadyExists
                        combinedList[u] = looksRare[i]
                        break
                    }
                }
            }

            if (!itemAlreadyExists)
            {
                combinedList.push(looksRare[i])
            }
        }
    }

    var openSea = await openseaTrending()

    //Merging OpenSea entries with LooksRare entries and removing doubles
    for (let i = 0; i < openSea.length; i++)
    {
        var itemAlreadyExists = false

        for (let u = 0; u < combinedList.length; u++)
        {
            if (openSea[i].id === combinedList[u].id)
            {
                console.log("Found repeat - ", combinedList[u].name)
                if (Number(openSea[i].dateStamp) === Number(combinedList[u].dateStamp))
                {
                    console.log("dateStamp is equal!,", openSea[i].dateStamp, combinedList[u].dateStamp)
                    
                    itemAlreadyExists = !itemAlreadyExists
                    
                    combinedList[u].dateStamp = openSea[i].dateStamp
                    combinedList[u].thumbnail = openSea[i].thumbnail
                    combinedList[u].banner = openSea[i].banner
                    combinedList[u].description = openSea[i].banner
                    
                    if (Number(openSea[i].floorPrice) < Number(combinedList[u].floorPrice))
                    {
                        combinedList[u].floorPrice = openSea[i].floorPrice
                    }

                    combinedList[u].dailyTradeVolumeETH = Number(combinedList[u].dailyTradeVolumeETH) + Number(openSea[i].dailyTradeVolumeETH)
                    combinedList[u].dailyTradedItemCount = Number(combinedList[u].dailyTradedItemCount) + Number(openSea[i].dailyTradedItemCount)

                    break
                }
                else if (Number(openSea[i].dateStamp) > Number(combinedList[u].dateStamp))
                {
                    console.log("dateStamp is greater!,", openSea[i].dateStamp, combinedList[u].dateStamp)
                    
                    itemAlreadyExists = !itemAlreadyExists
                    
                    combinedList[u].dateStamp = openSea[i].dateStamp
                    combinedList[u].thumbnail = openSea[i].thumbnail
                    combinedList[u].banner = openSea[i].banner
                    combinedList[u].description = openSea[i].banner
                    
                    if (Number(openSea[i].floorPrice) < Number(combinedList[u].floorPrice))
                    {
                        combinedList[u].floorPrice = openSea[i].floorPrice
                    }

                    combinedList[u].dailyTradeVolumeETH = openSea[i].dailyTradeVolumeETH
                    combinedList[u].dailyTradedItemCount = openSea[i].dailyTradedItemCount

                    break
                }
            }
        }

        if (!itemAlreadyExists)
        {
            console.log("Item doesn't exist, pushing")
            combinedList.push(openSea[i])
        }

    }

    console.log(combinedList)

    //Sorting by ETH trade volume
    combinedList.sort((a, b) => parseFloat(b.dailyTradeVolumeETH) - parseFloat(a.dailyTradeVolumeETH))

    return combinedList
}