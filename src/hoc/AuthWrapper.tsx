import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { ReactNode } from "react";
import { ROUTE_LOGIN } from "../constants";
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
    <Container disableGutters>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default AuthWrapper;
