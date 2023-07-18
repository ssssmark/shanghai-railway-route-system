import stations from "../data/stations.json"
const stationname=stations.map(item=>{
    return {
        value:item.id,
    }
});

export default stationname