import React from "react";
import { Provider } from "react-redux";
import Store from "./Redux/store";

import Home from "./pages/Home";
import Thunk from "./redux-thunk/index";
import Callback from "./useCallback/index";
import StyledComponents from "./styled-components/index";
function Routers() {
  return (
    <Provider store={Store}>
      <Home></Home>
      <hr />
      <Thunk></Thunk>
      <hr />
      <Callback />
      <hr />
      <StyledComponents />
    </Provider>
  );
}

export default Routers;
