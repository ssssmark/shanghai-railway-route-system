import stations from "./data/stations.json"
import transfers from "./data/transfers.json"
var n=stations.length+transfers.length
class Station{
    cx: 0
    cy: 0
    id: ""
    statid:""
    istransfer:false
    statarr:[]
}

export let allStation=[]
for(let i=0;i<stations.length;i++)
{
    let S=new Station()
    S.cx=stations[i].cx
    S.cy=stations[i].cy
    S.statid=stations[i].statid
    S.id=stations[i].id
    S.istransfer=false
    allStation.push(S)
}
for(let i=0;i<transfers.length;i++)
{
    let S=new Station()
    S.cx=transfers[i].x
    S.cy=transfers[i].y
    S.statid=transfers[i].statid
    S.id=transfers[i]["data-id"]
    S.statarr=transfers[i].statarr
    S.istransfer=true
    allStation.push(S)
}
//按线路排序
for(let i=0;i<allStation.length;i++)
{
    for(let j=i;j<allStation.length;j++)
    {
        if(Number(allStation[j].statid)<Number(allStation[i].statid))
        {
            let temp=allStation[j]
            allStation[j]=allStation[i]
            allStation[i]=temp
        }
    }
}
//找到前一个站点的索引
function findPrev(id, isTransfer) {
    if(isTransfer === true){
        for(let i = 0;i < n;i++){
            if (allStation[i].statid - id === -1){
                return i;
            }else{ //访问statarr
                if(allStation[i].statarr === undefined){
                    continue;
                }
                for(let j = 0;j < allStation[i].statarr.length;j++){
                    if(allStation[i].statarr[j] - id === -1){
                        return i;
                    }
                }
            }
        }
        return -1;
    }else{
        for (let i = 0; i < n; i++) {
            if (allStation[i].statid - id === 1) {
                return i;
            }
        }
        return -1;
    }
    return -1;
}
//找到后一个站点
function findNext(id, isTransfer) {
    if(isTransfer === true){
        for(let i = 0;i < n;i++){
            if (allStation[i].statid - id === 1){
                return i;
            }else{ //访问statarr
                if(allStation[i].statarr === undefined){
                    continue;
                }
                for(let j = 0;j < allStation[i].statarr.length;j++){
                    if(allStation[i].statarr[j] - id === 1){
                        return i;
                    }
                }
            }
        }
        return -1;
    }else{
        for (let i = 0; i < n; i++) {
            if (allStation[i].statid - id === -1) {
                return i;
            }
        }
        return -1;
    }
    return -1;
}
//寻找某一个站点
export function findStation(id) {
    for(let i = 0;i < n;i++){
        if(allStation[i].istransfer === true){
            if (allStation[i].statid === id){
                return i;
            }else{ //访问statarr
                if(allStation[i].statarr === undefined){
                    continue;
                }
                for(let j = 0;j < allStation[i].statarr.length;j++){
                    if(allStation[i].statarr[j] === id){
                        return i;
                    }
                }
            }
        }
        else{
            if (allStation[i].statid === id) {
                return i;
            }
        }
    }
    return -1;
}
export const adjMatrix = [];
for (let i = 0; i < n; i++) {
    adjMatrix.push(new Array(n).fill(0));
}

for (let i=0;i<n-1;i++)
{
    //换乘站，对前后站点建边
    if(allStation[i].istransfer===true)
    {
        for(let j = 0;j < allStation[i].statarr.length;j++)
        {
            let prev = findPrev(allStation[i].statarr[j], true);
            let next = findNext(allStation[i].statarr[j], true);
            if (prev !== -1) {
                adjMatrix[i][prev] = 1;
                adjMatrix[prev][i] = 1;
            }
            if (next !== -1) {
                adjMatrix[i][next] = 1;
                adjMatrix[next][i] = 1;
            }
        }
    }

    //普通站
    else{
        let prev = findPrev(allStation[i].statid, false);
        let next = findNext(allStation[i].statid, false);
        if (prev !== -1) {
            adjMatrix[i][prev] = 1;
            adjMatrix[prev][i] = 1;
        }
        if (next !== -1) {
            adjMatrix[i][next] = 1;
            adjMatrix[next][i] = 1;
        }
    }
}
//测试
export default {
    adjMatrix,
    allStation,
};



