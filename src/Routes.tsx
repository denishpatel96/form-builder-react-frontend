import React from "react";

import { Route, Routes as Switch } from "react-router-dom";
import {
  ConfirmForgotPasswordPage,
  ConfirmSignupPage,
  DashboardPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  SignupPage,
} from "./pages";
import {
  ROUTE_CONFIRM_FORGOT_PASSWORD,
  ROUTE_CONFIRM_SIGNUP,
  ROUTE_DASHBOARD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
} from "./constants";

const Routes = () => (
  <Switch>
    <Route path={ROUTE_HOME} element={<HomePage />} />
    <Route path={ROUTE_LOGIN} element={<LoginPage />} />
    <Route path={ROUTE_SIGNUP} element={<SignupPage />} />
    <Route path={ROUTE_CONFIRM_SIGNUP} element={<ConfirmSignupPage />} />
    <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
    <Route path={ROUTE_CONFIRM_FORGOT_PASSWORD} element={<ConfirmForgotPasswordPage />} />
    <Route path={ROUTE_DASHBOARD} element={<DashboardPage />} />
  </Switch>
);

export default Routes;
