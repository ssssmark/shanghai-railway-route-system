import stations from "../data/stations.json"
import transfers from "../data/transfers.json"
let stationname=stations.map(item=>{
    return {
        value:item.id,
    }
})
const transfer=transfers.map(item=>{
    return {
        value:item["data-id"],
    }
});
for(let i=0;i<transfer.length;i++)
{
    stationname.push(transfer[i])
}
    console.log(stationname)
export default stationname