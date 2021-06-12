import React from "react";
import ReactDOM from "react-dom";

class Movie extends React.Component {
  render() {
    console.log();
    return (
      <div>
         组件插条
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <Movie>
    <h1>子组件</h1>
    <h1>子组件</h1>
    <h1>子组件</h1>
  </Movie>,
  document.getElementById("app")
);
