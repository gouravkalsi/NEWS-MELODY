import './App.css';
 import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  } from "react-router-dom";
 
const App =()=> {
   const apikey = process.env.REACT_APP_NEWS_API
   const country= 'us'
   const [progress,setProgress] =useState(0);






     return (
       <div>
         <Router>
         <LoadingBar
            height={2}
            color='#f11946'
            progress={progress} 
          />
         <Navbar/>
         
         <Routes>
         <Route exact path="/" element={<News setProgress={setProgress}  apikey={apikey}key='general' country={country} category='' />} />
            <Route exact path="/business" element={<News setProgress={setProgress}  apikey={apikey}key='business' country={country} category='business' />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key='entertainment' country={country} category='entertainment' />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key='health' country={country} category='health' />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key='science' country={country} category='science' />} />
            <Route exact path="/sports" element={<News setProgress={setProgress}  apikey={apikey}key='sports' country={country} category='sports' />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key='technology' country={country} category='technology' />} />
        </Routes>
       </Router>
       </div>
     )
   }
   export default App;
