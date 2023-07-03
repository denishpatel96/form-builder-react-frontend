import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { ReactNode } from "react";
import { APP_BAR_HEIGHT, FOOTER_HEIGHT, ROUTE_LOGIN } from "../constants";
import { useAppDispatch } from "../store/hooks";
import { CookieStorage } from "../helpers/cookieStorage";
import { getPayload } from "../helpers/jwtHandler";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardHOC = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const AsyncFunc = async () => {
      console.log("Dashboard : Checking session...");
      const { idT } = CookieStorage.getAll();
      if (!(idT && getPayload(idT).exp * 1000 > Date.now())) {
        navigate(ROUTE_LOGIN);
      }
    };

    AsyncFunc();
  }, [dispatch, navigate, location]);

  return (
    <Box component="div" sx={{ minHeight: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
          paddingTop: `${APP_BAR_HEIGHT}px`,
          display: "flex",
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          display: "flex",
          height: FOOTER_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>©2023 vTwinForms</Typography>
      </Box>
    </Box>
  );
};

export default DashboardHOC;
