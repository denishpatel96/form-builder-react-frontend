import React from "react";

import { Route, Routes as Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ROUTE_HOME } from "./constants";

const Routes = () => (
  <Switch>
    <Route path={ROUTE_HOME} element={<HomePage />} />
  </Switch>
);

export default Routes;
