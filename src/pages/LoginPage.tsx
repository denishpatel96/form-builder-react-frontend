import React from "react";
import { Grid, Typography, Button, TextField, Box, IconButton, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  ROUTE_CONFIRM_SIGNUP,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_SIGNUP,
  ROUTE_WORKSPACES,
} from "../constants";
import {
  ArrowForwardOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import Logo from "../components/Reusable/Logo";
import Waves from "../components/Reusable/Waves";
import { validateEmail } from "../helpers/validators";
import { useLoginMutation, useRefreshLoginMutation } from "../store/features/api";
import { CookieStorage } from "../helpers/cookieStorage";
import Spinner from "../components/Reusable/Spinner";
import { setTokens } from "../store/features/authSlice";
import { alpha } from "@mui/material/styles";
import { getIdTokenPayload } from "../helpers/jwtHandler";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const event = searchParams.get("event");
  const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation();
  const [
    refreshLogin,
    {
      isUninitialized: isRefreshLoginUninitialised,
      isLoading: isRefreshLoginLoading,
      isSuccess: isRefreshLoginSuccess,
      isError: isRefreshLoginError,
      data: refreshLoginData,
    },
  ] = useRefreshLoginMutation();
  const defaultValues = {
    email: "",
    password: "",
    showPassword: false,
  };
  const [values, setValues] = React.useState<typeof defaultValues>(defaultValues);
  const [emailError, setEmailError] = React.useState<string>("");
  const username = useAppSelector((state) => state.auth.username);

  const handleSubmit = async () => {
    if (!isOnline) return;
    const isEmailValid = validateEmail(values.email);
    setEmailError("");
    if (!isEmailValid) {
      setEmailError("Please enter valid email.");
    } else {
      await login({ email: values.email, password: values.password });
    }
  };

  React.useEffect(() => {
    if (username) {
      navigate(ROUTE_WORKSPACES.replace(":orgId", username));
    }
  }, [username]);

  React.useEffect(() => {
    const onlineHandler = () => setIsOnline(true);
    const offlineHandler = () => setIsOnline(false);
    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    const AsyncFunc = async () => {
      console.log("Login : Checking session...");
      const { rT, idT, aT } = CookieStorage.getAll();
      // If idToken is present and not expired
      if (idT) {
        if (getIdTokenPayload(idT).exp * 1000 > Date.now()) {
          dispatch(setTokens({ refreshToken: rT, idToken: idT, accessToken: aT }));
        } else if (rT) {
          await refreshLogin({ refreshToken: rT });
        }
      }
    };

    AsyncFunc();

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  if (isRefreshLoginSuccess && refreshLoginData) {
    const idToken = refreshLoginData?.AuthenticationResult?.IdToken;
    const accessToken = refreshLoginData?.AuthenticationResult?.AccessToken;
    const refreshToken = refreshLoginData?.AuthenticationResult?.RefreshToken;

    if (idToken) {
      CookieStorage.setItem("idT", idToken);
      CookieStorage.setItem("aT", accessToken);
      dispatch(setTokens({ idToken, accessToken, refreshToken }));
    }
  }

  if (isError) {
    console.log("Error logging in : ", error);
    const errorName = (
      error as {
        data: {
          name: string;
          message: string;
          stack: string;
        };
        status: number;
      }
    )?.data?.name;
    if (errorName === "UserNotConfirmedException") {
      navigate(ROUTE_CONFIRM_SIGNUP);
    }
  } else if (isSuccess && data) {
    const idToken = data?.AuthenticationResult?.IdToken;
    const accessToken = data?.AuthenticationResult?.AccessToken;
    const refreshToken = data?.AuthenticationResult?.RefreshToken;
    CookieStorage.setItem("rT", refreshToken);
    CookieStorage.setItem("idT", idToken);
    CookieStorage.setItem("aT", accessToken);
    dispatch(setTokens({ refreshToken, idToken, accessToken }));
  }

  const helperButtons = (
    <Grid container>
      <Grid item xs={6}>
        <Button fullWidth onClick={() => navigate(ROUTE_FORGOT_PASSWORD)}>
          <Typography variant="body2">Forgot Password?</Typography>
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth onClick={() => navigate(ROUTE_SIGNUP)}>
          <Typography variant="body2">Don't have an account?</Typography>
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh)",
        minHeight: 600,
        p: 1,
        backgroundImage: (theme) =>
          `linear-gradient(0deg,
            ${theme.palette.primary.main} 45%, transparent 45%)`,
        backgroundSize: "cover",
      }}
    >
      <Logo />

      <Waves />
      <Box
        sx={{
          zIndex: 2,
          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.95),
          borderRadius: 2,
          mt: 2,
          p: 5,
          width: { xs: "100%", sm: "500px" },
        }}
      >
        {isRefreshLoginLoading ? (
          // progressBar("Refreshing Session...")
          <Spinner text={"Refreshing Session..."} />
        ) : (
          (isRefreshLoginUninitialised || isRefreshLoginError) && (
            <>
              {/* login form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Grid container spacing={2} pb={4}>
                  <Grid item xs={12}>
                    <Typography py={5} align="center" variant="h3" color="primary">
                      {`Login`}
                    </Typography>
                  </Grid>
                  {isOnline && isError && error && (
                    <Grid item xs={12}>
                      <Alert severity="error">
                        {(
                          error as {
                            data: {
                              name: string;
                              message: string;
                              stack: string;
                            };
                            status: number;
                          }
                        )?.data?.message || "Oops! Something went wrong!"}
                      </Alert>
                    </Grid>
                  )}
                  {!isOnline && (
                    <Grid item xs={12}>
                      <Alert severity="error">
                        You are currently offline. Please check your internet connection.
                      </Alert>
                    </Grid>
                  )}
                  {event === "emailChanged" && (
                    <Grid item xs={12}>
                      <Alert severity="success">
                        Your email changed successfully. Please login using new email address.
                      </Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Email"
                      fullWidth
                      value={values.email}
                      error={!!emailError}
                      helperText={emailError}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, email: e.target.value?.trim() }))
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Password"
                      fullWidth
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, password: e.target.value?.trim() }))
                      }
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() =>
                              setValues((prev) => ({ ...prev, showPassword: !prev.showPassword }))
                            }
                          >
                            {values.showPassword ? (
                              <VisibilityOutlined />
                            ) : (
                              <VisibilityOffOutlined />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      loading={isLoading}
                      loadingPosition={"end"}
                      endIcon={<ArrowForwardOutlined />}
                    >
                      Login
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
              {/* forgot password and link to signup */}
              {helperButtons}
            </>
          )
        )}
      </Box>
    </Grid>
  );
};
