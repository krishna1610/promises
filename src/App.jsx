import "./App.css";
import React from "react";
import AppBody from "./Components/AppBody";

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
    return <AppBody error={this.state.error} articles={this.state.articles} />;
  }
}

export default App;
