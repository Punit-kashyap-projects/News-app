/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };



  const updateNews = async () => {
    props.setProgress(10);
    console.log("calling news update function...");
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true)

    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    console.log(parsedData);

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])

  const fetchMoreData = async () => {
    console.log("calling");
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&pageSize=${props.pageSize}&page=${page+1}`;
    setPage(page + 1)

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    setTimeout(() => {
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    }, 600);
  };

    return (
      <>
        <h1 className="text-center" style={{marginTop: '90px'}}>
          NewsBulleting - Top {capitalize(props.category)} Headlines
        </h1>
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem
                      title={
                        element.title !== null
                          ? element.title.slice(0, 45)
                          : "No title here"
                      }
                      description={
                        element.description !== null
                          ? element.description.slice(0, 88)
                          : "No description here"
                      }
                      imageUrl={
                        element.urlToImage === null
                          ? "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-4.png"
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                      author={
                        element.author === null ? "Unknown" : element.author
                      }
                      date={element.publishedAt}
                      source={element.source.name}
                      categoryColor={props.categoryColor}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}
News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;