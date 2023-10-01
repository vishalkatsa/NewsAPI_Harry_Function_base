import "./App.css";
import React,{ useState } from "react";

import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar' /// top loading bar

export default function App()  {
  // pageSize= 8;
  // apiKey='e9976df59472494abd9fffbe56f6f8b3'
  const apiKey = process.env.REACT_APP_NEWS_API
  //  state ={
  //   progress: 0
  //  }
  //  setProgress = (progress) =>{
  //   setState({progress : progress})
  //  }
   const [progress, setprogress] = useState(0)
 
    return (
      <>
        <BrowserRouter>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        // {onLoaderFinished={() => setProgress(0)}}
      />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News apiKey={apiKey}  changeProgress={setprogress} key={'general'} pageSize={8} country={"in"} category={"general"} heading={'General'}/>} />
            <Route exact path="business" element={<News apiKey={apiKey} changeProgress={setprogress} key={'business'} pageSize={8} country={"in"} category={"business"} heading={'Business'}/>} />
            <Route exact path="entertainment" element={<News apiKey={apiKey} changeProgress={setprogress} key={'entertainment'} pageSize={8} country={"in"} category={"entertainment"} heading={'Entertainment'}/>} />
            <Route exact path="health" element={<News  apiKey={apiKey}changeProgress={setprogress} key={'health'} pageSize={8} country={"in"} category={"health"} heading={'Health'}/>} />
            <Route exact path="science" element={<News  apiKey={apiKey}changeProgress={setprogress} key={'science'} pageSize={8} country={"in"} category={"science"} heading={'Science'}/>} />
            <Route exact path="sports" element={<News  apiKey={apiKey}changeProgress={setprogress} key={'sports'} pageSize={8} country={"in"} category={"sports"}heading={'Sports'} />} />
            <Route exact path="technology" element={<News apiKey={apiKey} changeProgress={setprogress} key={'technology'} pageSize={8} country={"in"} category={"technology"} heading={'Technology'}/>} />
            

          </Routes>
        </BrowserRouter>
      </>
    );
  }


