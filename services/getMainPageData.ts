//import looksrareTrending from "./looksrare"
import openseaTrending from "./opensea"

export default async function getMainPageData() {
    
    let combinedList = []

    var opensea = await openseaTrending()

    //Removing duplicate opensea entries
    for (let i = 0; i < opensea.length; i++)
    {
        if (combinedList.length === 0)
        {
            combinedList.push(opensea[i])
        }
        else
        {
            var itemAlreadyExists = false

            for (let u = 0; u < combinedList.length; u++)
            {
                if (opensea[i].id === combinedList[u].id)
                {
                    itemAlreadyExists = true

                    if (Number(opensea[i].dateStamp) > Number(combinedList[u].dateStamp))
                    {
                        combinedList.splice(u, 1)
                        combinedList.push(opensea[i])
                    }
                }
            }

            if (!itemAlreadyExists)
            {
                combinedList.push(opensea[i])
                itemAlreadyExists = false
            }
        }
    }

    //Sorting by ETH trade volume
    combinedList.sort((a, b) => parseFloat(b.dailyTradeVolumeETH) - parseFloat(a.dailyTradeVolumeETH))

    return combinedList
}