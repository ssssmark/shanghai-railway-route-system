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
        showpath:false
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
        path.unshift(src)
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
        let {distance,path}=this.dijkstra(adjMatrix,index1,index2)
        this.setState({
            path:path,
            showpath:true
        })
        this.props.getpath(path)
        this.gettransfer(path)
    }
    //判断路径上两站是否在同一条线路上
    insameline=(a,transfer)=>{
        if(a.istransfer===false)
        {
            for(let i=0;i<transfer.statarr.length;i++)
            {
                if(transfer.statarr[i].length===4)
                {
                    if(a.statid.length===4 && a.statid.slice(0,2)===transfer.statarr[i].slice(0,2))
                    {
                        return Number(a.statid.slice(0,2))
                    }
                }
                else if(transfer.statarr[i].length===3)
                {
                    if(a.statid.length===3 && a.statid[0]===transfer.statarr[i][0])
                    {
                        return Number(a.statid[0])
                    }
                }
            }
        }
        else if(a.istransfer===false){
            for(let i=0;i<transfer.statarr.length;i++)
            {
                for(let j=0;j<a.statarr.length;j++)
                {
                    if(transfer.statarr[i].length===a.statarr[j].length){
                        if(a.statarr[j].length===3)
                        {
                            if(a.statarr[j][0]===transfer.statarr[i][0])
                            {
                                return Number(a.statarr[j][0])
                            }
                        }
                        else if(a.statarr[j].length===4)
                        {
                            if(a.statarr[j].slice(0,2)===transfer.statarr[i].slice(0,2))
                            {
                                return Number(a.statarr[j].slice(0,2))
                            }
                        }
                    }
                }
            }
        }
        return -1
    }
    gettransfer=(path)=>{
        for(let i=1;i<path.length-1;i++)
        {
            if(allStation[path[i]].istransfer===true)
            {
                let cur=allStation[path[i]],
                    pre=allStation[path[i-1]],
                    next=allStation[path[i+1]]
                let line1=this.insameline(pre,cur),
                    line2=this.insameline(next,cur)
                console.log(line1,line2)
                if(line1!==line2)
                {
                    console.log(line1+"->"+cur.id+"->"+line2)
                }

            }
        }
    }
    render()
    {
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
                            id = "search"
                            onClick={this.search}
                    >
                        Search
                    </Button>
                </div>
                <div className="showRoute" >
                    需在如下车站换乘：
                </div>

            </div>
        )
   }
}