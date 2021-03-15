import "./App.css";
import React from "react";

const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=b5e4aade57854b568497b5284c3d2c3e";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      error: null,
    };
  }

  componentDidMount() {
    fetch(url)
      .then((response) => {
        // success/failure 1
        if (response.ok) {
          // 200 ..< 300
          return response.json();
        } else {
          throw "Unknown error occured. Please try again later.";
        }
      })
      .then((data) => {
        // success 2
        return data.articles;
      })
      .then((articles) => {
        // success 3
        this.setState({ articles: articles, error: null });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ articles: [], error: error });
      });
  }

  render() {
    let child;
    if (this.state.error) {
      child = <p>{this.state.error}</p>;
    } else {
      child = this.state.articles.map((article, index) => {
        return (
          <div className="card my-2" key={index}>
            <div className="row g-0">
              <div className="col-md-3">
                <img
                  className="img img-fluid"
                  src={article.urlToImage}
                  alt={article.source.name}
                ></img>
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{article.source.name}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return <div className="container">{child}</div>;
  }
}

export default App;
