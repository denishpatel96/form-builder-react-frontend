import React from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import {
  HIDE_TOAST_DURATION,
  ROUTE_CONFIRM_SIGNUP,
  ROUTE_DASHBOARD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_SIGNUP,
} from "../constants";
import {
  ArrowForwardOutlined,
  Login,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import Logo from "../components/Reusable/Logo";
import Waves from "../components/Reusable/Waves";
import { validateEmail } from "../helpers/validators";
import { useLoginMutation, useRefreshLoginMutation } from "../store/features/authApi";
import { hideToast, showToast } from "../store/features/signalSlice";
import { ErrorResponse } from "../declaration";
import { setTokens } from "../store/features/authSlice";
import { CookieStorage } from "../helpers/cookieStorage";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation();
  const [
    refreshLogin,
    { isLoading: isRefreshLoginLoading, isSuccess: isRefreshLoginSuccess, data: refreshLoginData },
  ] = useRefreshLoginMutation();
  const defaultValues = {
    email: "",
    password: "",
    showPassword: false,
  };
  const [values, setValues] = React.useState<typeof defaultValues>(defaultValues);
  const [emailError, setEmailError] = React.useState<string>("");

  const handleSubmit = async () => {
    const isEmailValid = validateEmail(values.email);
    setEmailError("");
    if (!isEmailValid) {
      setEmailError("Please enter valid email.");
    } else {
      await login({ email: values.email, password: values.password });
    }
  };

  React.useEffect(() => {
    const AsyncFunc = async () => {
      const rT = CookieStorage.getItem("token");
      if (rT) {
        console.log("Refreshing tokens...");
        await refreshLogin({ refreshToken: rT });
      }
    };

    AsyncFunc();
  }, []);

  React.useEffect(() => {
    const AsyncFunc = async () => {
      if (isRefreshLoginSuccess && refreshLoginData) {
        const accessToken = refreshLoginData?.data?.AuthenticationResult?.AccessToken;
        const refreshToken = CookieStorage.getItem("token") as string;
        const idToken = refreshLoginData?.data?.AuthenticationResult?.IdToken;

        dispatch(setTokens({ accessToken, refreshToken, idToken }));
        CookieStorage.setItem("token", refreshToken);
        navigate(ROUTE_DASHBOARD);
      }
    };

    AsyncFunc();
  }, [dispatch, isRefreshLoginSuccess]);

  React.useEffect(() => {
    const toastId = new Date().valueOf();
    if (isError) {
      console.log("error", error);
      const errorName = error && "data" in error && (error?.data as ErrorResponse)?.error?.name;
      if (errorName === "UserNotConfirmedException") {
        navigate(ROUTE_CONFIRM_SIGNUP);
      } else {
        dispatch(
          showToast({
            id: toastId,
            message: "Incorrect email or password",
            severity: "error",
          })
        );
      }
      setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
    } else if (isSuccess && data) {
      const accessToken = data?.data?.AuthenticationResult?.AccessToken;
      const refreshToken = data?.data?.AuthenticationResult?.RefreshToken;
      const idToken = data?.data?.AuthenticationResult?.IdToken;

      dispatch(setTokens({ accessToken, refreshToken, idToken }));
      CookieStorage.setItem("token", refreshToken);
      navigate(ROUTE_DASHBOARD);
    }
  }, [isError, isSuccess, dispatch]);

  const form = (
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
        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            fullWidth
            value={values.email}
            error={!!emailError}
            helperText={emailError}
            onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Password"
            fullWidth
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
            InputProps={{
              endAdornment: (
                <IconButton
                  edge="end"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    setValues((prev) => ({ ...prev, showPassword: !prev.showPassword }))
                  }
                >
                  {values.showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
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
            loading={isLoading || isRefreshLoginLoading}
            loadingPosition={"end"}
            endIcon={<ArrowForwardOutlined />}
          >
            Login
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );

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
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: 2,
          mt: 2,
          p: 5,
          width: { xs: "100%", sm: "500px" },
        }}
      >
        {/* login form */}
        {form}
        {/* forgot password and link to signup */}
        {helperButtons}
      </Box>
    </Grid>
  );
};
