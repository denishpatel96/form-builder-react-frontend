import React from "react";
import DashboardHOC from "../hoc/DashboardHOC";
import Dashboard from "../components/Dashboard";
import { getPayload } from "../helpers/jwtHandler";
import { CookieStorage } from "../helpers/cookieStorage";

export const DashboardPage = () => {
  const idToken = CookieStorage.getItem("idT");
  return <DashboardHOC>{idToken && <Dashboard userId={getPayload(idToken).sub} />}</DashboardHOC>;
};
