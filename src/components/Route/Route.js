import React from "react";
import {allStation} from "../../algorithm";
import loc from "../../res/img/loc.svg"
import stations from '../../data/stations.json'
import transfers from "../../data/transfers.json"
export default class Route extends React.Component{
    renderRoute(path){
        let allRoute=[]
        for(let i=0;i<path.length-1;i++)
        {
            let x1=Number(allStation[path[i]].cx),
                y1=Number(allStation[path[i]].cy),
                x2=Number(allStation[path[i+1]].cx),
                y2=Number(allStation[path[i+1]].cy)
            //调整位置
            if(allStation[path[i+1]].istransfer===true)
            {
                x2=x2+9
                y2+=4
            }
            if(allStation[path[i]].istransfer===true)
            {
                x1+=7
                y1+=2
            }
                allRoute.push(<line x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    key={i}
                                    stroke="Yellow"
                                    strokeWidth="10"
                    />
                )

        }
        return allRoute
    }

    renderRout(path){
        console.log(path)
        if(path[0] === -1 || path[0] === undefined)
            return (<g/>)
        let allRoute=[]
        for(let i=0;i<path.length;i++)
        {
            console.log(i)
            for(let j=0;j<stations.length;j++)
            {
                if(stations[j].id===allStation[path[i]].id)
                {
                    console.log(i,j)
                    let x1=Number(stations[j].cx),
                        y1=Number(stations[j].cy)
                    allRoute.push(<image href={loc}
                                         x={x1-60}
                                         y={y1-60}
                                         width="50"
                                         height="50"
                        />
                    )
                }
            }
            for(let k=0;k<transfers.length;k++)
            {
                if(transfers[k]["data-id"]===allStation[path[i]].id)
                {
                    console.log(i,k)
                    let x1=Number(stations[k].cx)+7,
                        y1=Number(stations[k].cy)+2
                    allRoute.push(<image href={loc}
                                         x={x1-60}
                                         y={y1-60}
                                         width="50"
                                         height="50"
                        />
                    )
                }
            }

        }
        return allRoute
    }
    render(){
        const {path}=this.props
        return (
                <g>
                    {this.renderRout(path)}
                </g>
        )
    }
}