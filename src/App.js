import './App.css';
import Searchbox from "./components/SearchBox/searchbox";
import Line from "./components/Line/Line";
import Station from "./components/Station/station";
import React from "react";
import asyncLabel from "./components/Labels/Label";
import Route from "./components/Route/Route";
import {allStation} from "./algorithm";
const Label = asyncLabel(() => import('../src/components/Labels/Label'))
export default class App extends React.Component {
    state={
        path:[]
    }
    getpath=(path)=>{
        this.setState({
            path:path
        })
    }
    render(){
        return (
            <div className="App" >
                <div >
                    <div className="Home">
                        <Searchbox getpath={this.getpath}/>
                        <div>
                            <svg className="svg" viewBox="200 200 3000 3000"  >
                                <Line/>
                                <Label/>
                                <Station/>
                                <Route path={this.state.path}/>
                            </svg>
                        </div>

                    </div>
                </div>

            </div>
        );
    }

}
