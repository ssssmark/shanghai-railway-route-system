import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar/navbar'
import Searchbox from "./components/SearchBox/searchbox";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
      <Searchbox/>
  </React.StrictMode>
);

reportWebVitals();
