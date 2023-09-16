import React from 'react'
import './App.css';
//  import Api_fetch_data from "./Api_fetch_data";
import Api_data_axios from './Api_data_axios';

function App() {
  return (
  <div>
    <h1>Let Start</h1>
    {/* <Api_fetch_data/> */}
    <Api_data_axios/>
  </div>  
  );
}

export default App;
