import React from "react";
import stations from '../../data/stations.json'
import transfers from '../../data/transfers.json'
import transferPath from '../../res/img/transfer.png'
export  default  class Station extends React.Component{
    render() {
        const stationEles = [];
        const transferEles = [];

        for (let i = 0; i < stations.length; i++) {
            const station = stations[i];
            stationEles.push(
                <circle cx={station.cx} cy={station.cy} r="5" fill="white" stroke={station.stroke} id={station.id} statid={station.statid} key={station.id + i}></circle>
            )
        }

        for (let i = 0; i < transfers.length; i++) {
            const transfer = transfers[i];
            transferEles.push(
                <image x={transfer.x} y={transfer.y} dataid={transfer['data-id']} xlinkHref={transferPath} statid={transfer.statid} key={transfer['data-id']+i}
                       height="16" width="16"></image>
            )
        }
        return (
            <g>
                {stationEles}
                {transferEles}
            </g>
        )
    }
}