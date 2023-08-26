import React from "react";
import {allStation} from "../../algorithm";
import loc from "../../res/img/loc.svg"
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
    render(){
        const {path}=this.props
        return (
                <g >
                    {this.renderRoute(path)}
                </g>
        )
    }
}