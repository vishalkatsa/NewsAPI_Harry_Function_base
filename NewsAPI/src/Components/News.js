import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Newsitem from './Newsitem'
// import Loding from './Loding';
import  PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

  // use state
  const [articles, setarticles] = useState([])
  const [totalResults, settotalResults] = useState(0)
  const [page, setpage] = useState(1)
  // const [loading, setloading] = useState(false)

 
  
  const Update = async ()=> {
    props.changeProgress(10) // top scroll bar
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    props.changeProgress(30) // top scroll bar
    let data = await fetch(url);
    props.changeProgress(40) // top scroll bar
    let parseData = await data.json();
    props.changeProgress(60) // top scroll bar
    setarticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setpage(parseData.page)
    // setloading(false)
    props.changeProgress(100) // top scroll bar
    document.title = `${firstLatterCapitel(props.category)} - Go News`;

  };
  useEffect(() => {
    Update()
  }, [])
  

   
  const firstLatterCapitel = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  
  const fetchMoreData = async () => { //scroll bar 
    props.changeProgress(10) // top scroll bar
    setpage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parseData = await data.json(); 
    setarticles(articles.concat(parseData.articles));
    settotalResults(parseData.totalResults)
    props.changeProgress(100) // top scroll bar

  };
  
  
  
    return (
      <>
      
      
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={'loading...'} 
        >    
            <div className='container '>
            <h1 className='text-center font-bold text-4xl mt-5
            '>{`${props.heading} Go News`}</h1>

                <div className='row '>
                      {articles.map((element,index)=>{ /// json format data map and display on html page 
                          return <div className='col-md-3 py-3' key={index}> <Newsitem title={element.title?element.title.slice(0,42): ""} Discription={element.description?element.description.slice(0,88):""} Imageurl={element.urlToImage} newsurl={element.url} authorName={element.author} DateTime={element.publishedAt}/> </div>
                      })}
                        
                </div>
                      
            </div>
          </InfiniteScroll>
      
       
      </>
    )
  }











News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
  heading: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  heading: PropTypes.string,
}