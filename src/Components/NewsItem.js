import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source, categoryColor} =
      this.props;
      console.log(categoryColor);
    return (
      <div>
        <div className="card">
          <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-${categoryColor}`} style={{left:'90%', zIndex:1}}>
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="reaload page" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
