import './App.css';
import Searchbox from "./components/SearchBox/searchbox";
import Line from "./components/Line/Line";
import Station from "./components/Station/station";
import React from "react";
import asyncLabel from "./components/Labels/Label";
const Label = asyncLabel(() => import('../src/components/Labels/Label'))
function App() {
  return (
    <div className="App" >
        <div >
            <div className="Home">
                <Searchbox/>
                <div>
                    <svg className="svg" viewBox="200 200 3000 3000"  >
                        <Line/>
                        <Label/>
                        <Station/>

                    </svg>
                </div>

            </div>
        </div>

    </div>
  );
}

export default App;
