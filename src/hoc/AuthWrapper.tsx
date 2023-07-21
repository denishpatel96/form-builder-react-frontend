import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { ReactNode } from "react";
import { APP_BAR_HEIGHT, FOOTER_HEIGHT, ROUTE_LOGIN } from "../constants";
import { CookieStorage } from "../helpers/cookieStorage";
import { getIdTokenPayload } from "../helpers/jwtHandler";
import { useAppDispatch } from "../store/hooks";
import { setTokens } from "../store/features/authSlice";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const AsyncFunc = async () => {
      console.log("Dashboard : Checking session...");
      const { rT, idT, aT } = CookieStorage.getAll();
      if (!(idT && getIdTokenPayload(idT).exp * 1000 > Date.now())) {
        navigate(ROUTE_LOGIN);
      } else {
        dispatch(setTokens({ idToken: idT, refreshToken: rT, accessToken: aT }));
      }
    };

    AsyncFunc();
  }, [navigate]);

  return (
    <Box component="div" sx={{ height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          height: `calc(100vh - ${FOOTER_HEIGHT}px)`,
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
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography>©2023 vTwinForms</Typography>
      </Box>
    </Box>
  );
};

export default AuthWrapper;
