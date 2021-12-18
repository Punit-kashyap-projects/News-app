/* eslint-disable no-undef */
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    // console.log("Hello i am constuctor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      api: "026c0a3147d74e329a3d4cefbda0e9f7",
    };
    document.title = `NewsBulletin - ${this.capitalize(this.props.category)}`;
  }

  async updateNews() {
    console.log("calling news update function...");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.state.api}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    console.log(this.state.articles.length);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    console.log("calling");
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.state.api}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    // this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    setTimeout(() => {
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        // loading: false,
      });
    }, 600);
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          NewsBulleting - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
                          ? "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101027/112815900-no-image-available-icon-flat-vector.jpg?ver=6"
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                      author={
                        element.author === null ? "Unknown" : element.author
                      }
                      date={element.publishedAt}
                      source={element.source.name}
                      categoryColor={this.props.categoryColor}
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
}
