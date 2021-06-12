import React from "react";
import ReactDOM from "react-dom";

import css from "./css/index.module.css";

function Style() {
  return <div className={css.test}>样式表样式</div>;
}

ReactDOM.render(<Style></Style>, document.getElementById("app"));
