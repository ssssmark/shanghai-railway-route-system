import stations from "./data/stations.json"
import transfers from "./data/transfers.json"
var transfer_id=[

]
var n=stations.length+transfers.length
class Station{
    cx: 0
    cy: 0
    id: ""
    statid:""
    istransfer:false
    statarr:[]
}

let allStation=[]
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
//创建邻接矩阵
const adjMatrix = [];
for (let i = 0; i < n; i++) {
    adjMatrix.push(new Array(n).fill(null));
}
//先处理普通站点，每一站和下一站有边
for (let i=0;i<n-1;i++)
{
    if(allStation[i].statid.length!==allStation[i+1].statid.length)
    {
        continue
    }
    else{
        if(allStation[i].statid.length===4)
        {
            if(allStation[i].statid.slice(0,2)===allStation[i+1].statid.slice(0,2)&&(Number(allStation[i+1].statid.slice(2,4))-Number(allStation[i].statid.slice(2,4)))===1)
            {
                console.log(allStation[i],allStation[i+1])
                adjMatrix[i][i+1]=1
            }
        }
        else if(allStation[i].statid.length===3)
        {
            if(allStation[i].statid.slice(0,1)===allStation[i+1].statid.slice(0,1)&&(Number(allStation[i+1].statid.slice(1,3))-Number(allStation[i].statid.slice(1,3)))===1)
            {
                console.log(allStation[i],allStation[i+1])
                adjMatrix[i][i+1]=1
            }
        }
    }
    if(allStation[i].istransfer===true)
    {
        let index=allStation[i].statarr.indexOf(allStation[i].statid)
        console.log(allStation[i])
        if(index+1<allStation[i].statarr.length)
        {
            allStation[i].statid=allStation[i].statarr[index+1]
        }
        console.log(allStation[i])
    }
}
export default allStation
