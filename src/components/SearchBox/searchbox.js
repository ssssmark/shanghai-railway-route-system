import React from "react";
import "./searchbox.css"
import Selectbox from "../Selectbox/Selectbox.js"
import {Button} from "@mui/material";
import {adjMatrix, allStation} from "../../algorithm";
export default class Searchbox extends React.Component{
    state={
        tabindex:1,
        start_station:'',
        destination:'',
    }
    changetab=(activeindex)=>{
        this.setState({
            tabindex:activeindex
        })
    }
    getstartstation=(val)=>{
        console.log(val)
        this.setState({
            start_station:val,
        })
    }
    getdestination=(val)=>{

        this.setState({
            destination:val
        })
    }
    dijkstra(adjMatrix, i, j) {
        let dist = [];
        let prev = [];

        for (let i = 0; i < adjMatrix.length; i++) {
            dist[i] = Number.MAX_VALUE;
            prev[i] = -1;
        }

        dist[i] = 0;

        let S = new Set();

        while (S.size < adjMatrix.length) {
            let minDist = Number.MAX_VALUE;
            let u = -1;
            for (let k = 0; k < adjMatrix.length; k++) {
                if (!S.has(k) && dist[k] < minDist) {
                    u = k;
                    minDist = dist[k];
                }
            }

            if (u < 0) break;

            S.add(u);
            for (let k = 0; k < adjMatrix.length; k++) {
                if (adjMatrix[u][k] < Number.MAX_VALUE && S.has(k)) {
                    if (dist[u] + adjMatrix[u][k] < dist[k]) {
                        dist[k] = dist[u] + adjMatrix[u][k];
                        prev[k] = u;
                    }
                }
            }
        }

        let path = [];
        let curr = j;
        while (curr !== -1) {
            path.unshift(curr);
            curr = prev[curr];
        }

        return {
            distance: dist[j],
            path: path
        };
    }
    search=()=>{
        const start=allStation.find(obj=>obj.id===this.state.start_station)
        const destination=allStation.find(obj=>obj.id===this.state.destination)
        const index1=allStation.indexOf(start)
        const index2=allStation.indexOf(destination)
        console.log(start,destination,index1,index2)
        let {distance,path}=this.dijkstra(adjMatrix,index1,index2)
        console.log(distance,path)
    }
    render()
    {
        console.log(this.state)
        return(
            <div className="Search-box">
                <div className="title">MetroPlan</div>
                <div className="top-tab">
                    <div className={this.state.tabindex===1?"selected-div": "unselected-div"} onClick={()=>this.changetab(1)}>
                        <img src={this.state.tabindex===1?require('../../res/icon/selected-tick.png'):require('../../res/icon/unselected-tick.png')} className="ticker" alt='ticker'/>
                        <div className={this.state.tabindex===1?"selected-tab": "unselected-tab"}>EXPLORE AVAILABLE ROUTES</div>
                    </div>
                    <div className={this.state.tabindex===2?"selected-div": "unselected-div"} onClick={()=>this.changetab(2)}>
                        <img src={this.state.tabindex===2?require('../../res/icon/selected-tick.png'):require('../../res/icon/unselected-tick.png')} className="ticker" alt='ticker'/>
                        <div className={this.state.tabindex===2?"selected-tab": "unselected-tab"}>CREATE YOUR OWN ROUTE</div>
                    </div>

                </div>
            <div className="input_station"></div>
                <div className="inputdiv">
                    <div className="from-to">From</div>
                    <Selectbox get_station={this.getstartstation}/>
                </div>
                <div className="inputdiv">
                    <div className="from-to">To</div>
                    <Selectbox className="destination" get_station={this.getdestination}/>
                </div>
                <div className="button">
                    <Button variant="contained"
                            color="primary"
                            className="button"
                            onClick={this.search}
                    >
                        Search
                    </Button>
                </div>


            </div>
        )
   }
}