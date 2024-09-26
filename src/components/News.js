import React, { useEffect, useState } from 'react';
import Newsitems from './Newsitems';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  
  useEffect(() => {
    document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMellody`;
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch news based on the current page
  const fetchNews = async () => {
    props.setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=12`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  // Fetch more data for infinite scroll
  const fetchMoreData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=12`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles)); // Append new articles
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-3 pt-5">
      <h1 className="text-center text-light">
        Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading && <Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4 mb-3 my-3" key={element.url}>
                <Newsitems
                  title={element.title ? element.title.slice(0, 60) : ''}
                  description={element.description ? element.description.slice(0, 60) : ''}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  date={element.publishedAt}
                  author={element.author ? element.author.slice(0, 30) : ''}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

// Setting default props and prop types
News.defaultProps = {
  country: 'us',
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  setProgress: PropTypes.func,
  apikey: PropTypes.string.isRequired, // Ensure apiKey is passed
};

export default News;
