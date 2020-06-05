import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./view/Home";
import CreatePoint from "./view/CreatePoint";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/create-point" exact component={CreatePoint} />
    </BrowserRouter>
  );
};
export default Routes;
