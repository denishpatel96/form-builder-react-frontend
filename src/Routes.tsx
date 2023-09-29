import React from "react";

import { Route, Routes as Switch } from "react-router-dom";
import {
  ConfirmForgotPasswordPage,
  ConfirmSignupPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  // OrganizationSettingsPage,
  SignupPage,
  UserSettingsPage,
  WorkspacesPage,
} from "./pages";
import {
  ROUTE_USER_SETTINGS,
  ROUTE_CONFIRM_FORGOT_PASSWORD,
  ROUTE_CONFIRM_SIGNUP,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_WORKSPACE,
  ROUTE_WORKSPACES,
  // ROUTE_ORGANIZATION_SETTINGS,
} from "./constants";

const Routes = () => (
  <Switch>
    <Route path={ROUTE_HOME} element={<HomePage />} />
    <Route path={ROUTE_LOGIN} element={<LoginPage />} />
    <Route path={ROUTE_SIGNUP} element={<SignupPage />} />
    <Route path={ROUTE_CONFIRM_SIGNUP} element={<ConfirmSignupPage />} />
    <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
    <Route path={ROUTE_CONFIRM_FORGOT_PASSWORD} element={<ConfirmForgotPasswordPage />} />
    <Route path={ROUTE_WORKSPACES} element={<WorkspacesPage />} />
    <Route path={ROUTE_WORKSPACE} element={<WorkspacesPage />} />
    <Route path={ROUTE_USER_SETTINGS} element={<UserSettingsPage />} />
    {/* <Route path={ROUTE_ORGANIZATION_SETTINGS} element={<OrganizationSettingsPage />} /> */}
    <Route path={"*"} element={<LoginPage />} />
  </Switch>
);

export default Routes;
