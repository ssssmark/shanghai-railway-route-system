import "./navbar.css"
import React from 'react'
export default class Navbar extends React.Component{
    state={
        tabIndex:1
    }
    changestate=(activeindex)=> {
        this.setState({
            tabIndex:activeindex
        })
    }
    render()
    {
        return(
            <div>
                <div className="Navbar">
                    <div className="title">MetroPlan</div>
                    <div className={this.state.tabIndex===1?"selected-tab":"unselected-tab"} id="home" onClick={()=>this.changestate(1)}>Home</div>
                    <div className={this.state.tabIndex===2?"selected-tab":"unselected-tab"} id="help"onClick={()=>this.changestate(2)}>Help</div>
                </div>
            </div>
        )
    }
}