import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar/navbar'
import Searchbox from "./components/SearchBox/searchbox";
import SubwayMap from "./components/Map/SubwayMap.js";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
      <div className="Home"><Searchbox/>
          <SubwayMap/></div>

  </React.StrictMode>
);

reportWebVitals();
