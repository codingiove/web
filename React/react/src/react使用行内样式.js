import React from "react";
import ReactDOM from "react-dom";

function Style() {
  return <div style={{ color: "red", fontSize: "50px" }}>行内样式</div>;
}

ReactDOM.render(<Style></Style>, document.getElementById("app"));
