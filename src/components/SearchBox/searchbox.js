import React from "react";
import "./searchbox.css"
import {Cascader} from "antd";
import Selectbox from "../Selectbox/Selectbox.js"
import stations from "../../data/stations.json"
import {Button} from "@mui/material";
import allStation from "../../algorithm";
export default class Searchbox extends React.Component{
    state={
        tabindex:1,
    }
    changetab=(activeindex)=>{
        this.setState({
            tabindex:activeindex
        })
    }
    render()
    {
        console.log(allStation)
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
                    <Selectbox />
                </div>
                <div className="inputdiv">
                    <div className="from-to">To</div>
                    <Selectbox className="destination"/>
                </div>
                <div className="button">
                    <Button variant="contained"
                            color="primary"
                            className="button"
                    >
                        Search
                    </Button>
                </div>


            </div>
        )
   }
}