import './App.css';
import Navbar from "./components/Navbar/navbar";
import Searchbox from "./components/SearchBox/searchbox";
import Line from "./components/Line/Line";
import Station from "./components/Station/station";
import React from "react";
import asyncLabel from "./components/Labels/Label";
const Label = asyncLabel(() => import('../src/components/Labels/Label'))
function App() {
  return (
    <div className="App">
        <div className="Home"><Searchbox/>
            <svg className="svg" viewBox="200 200 3000 3000"  >
                <Line/>
                <Label/>
                <Station/>

            </svg>
        </div>
    </div>
  );
}

export default App;
