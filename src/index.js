import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar/navbar'
import Searchbox from "./components/SearchBox/searchbox";
import SubwayMap from "./components/Map/SubwayMap.js";
import Line from "./components/Line/Line";
import Station from "./components/Station/station";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
      <div className="Home"><Searchbox/>
          <svg className="svg" viewBox="200 200 3000 3000" >
              <Line/>
              <Station/>
          </svg>
          </div>

  </React.StrictMode>
);

reportWebVitals();
