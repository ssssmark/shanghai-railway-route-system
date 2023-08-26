import React from "react";
import "./searchbox.css"
import Selectbox from "../Selectbox/Selectbox.js"
import {Button} from "@mui/material";
import {adjMatrix, allStation, findStation} from "../../algorithm";
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
        this.setState({
            start_station:val,
        })
    }
    getdestination=(val)=>{

        this.setState({
            destination:val
        })
    }
    minDistance = (dist, visited)=>{
        let min = Infinity, minIndex = -1
        for(let v = 0; v < dist.length; v++){
            if(visited[v] === false && dist[v] <= min){
                min = dist[v]
                minIndex = v
            }
        }
        return minIndex
    }
    dijkstra(graph, src,dst) {
        let dist = [],
            visited = [],
            prev = [], //用于记录前驱节点
            length =graph.length
        //初始化
        for(let i = 0; i < length; i++){
            dist[i] = Infinity
            visited[i] = false
        }
        dist[src] = 0

        for(let i = 0; i < length-1; i++){
            let u = this.minDistance(dist, visited) //寻找最短路
            visited[u] = true;
            for(let v = 0; v < length; v++){
                if(!visited[v] && graph[u][v] !== 0 && dist[u] !== Infinity  &&
                    dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v] //若找到更短路，更新
                    prev[v] = u; // 记录u为前驱节点
                }
            }
        }
        // 构建src到dst的路径
        let path = [];
        let curr = dst;
        while(curr !== src) {
            //输出车站名
            console.log(allStation[curr].id)
            path.unshift(curr);
            curr = prev[curr];
        }

        return {
            distance:dist[dst],
            path:path
        }
        //处理完所有节点，返回源点到其他顶点的最短路径距离向量
    }
    search=()=>{
        console.log(adjMatrix)
        const start=allStation.find(obj=>obj.id===this.state.start_station)
        const destination=allStation.find(obj=>obj.id===this.state.destination)
        const index1=allStation.indexOf(start)
        const index2=allStation.indexOf(destination)
        console.log(start,destination,index1,index2)
        let {distance,path}=this.dijkstra(adjMatrix,index1,index2)
        console.log(distance)
        this.props.getpath(path)
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