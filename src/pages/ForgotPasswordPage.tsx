import React from "react";
import { Grid, Typography, Button, TextField, Box, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { HIDE_TOAST_DURATION, ROUTE_LOGIN } from "../constants";
import { ArrowForwardOutlined, MarkEmailRead } from "@mui/icons-material";
import Logo from "../components/Reusable/Logo";
import Waves from "../components/Reusable/Waves";
import { validateEmail } from "../helpers/validators";
import { useForgotPasswordMutation } from "../store/features/api";
import { hideToast, showToast } from "../store/features/signalSlice";
import { alpha } from "@mui/material/styles";

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<boolean>(false);

  const [forgotPassword, { isLoading, isSuccess, isError, error }] = useForgotPasswordMutation();

  if (isError) {
    const toastId = new Date().valueOf();
    console.log("Error sending password reset link : ", error);
    dispatch(
      showToast({
        id: toastId,
        message: "Error sending password reset link",
        severity: "error",
      })
    );
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  }

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError(true);
    } else {
      await forgotPassword({ email });
    }
  };

  const success = (
    <Stack>
      <MarkEmailRead sx={{ height: 100, width: 100, margin: "auto" }} color="secondary" />
      <Typography variant="h3" textAlign={"center"}>
        Password reset link sent
      </Typography>
      <Typography py={6}>
        We have sent password reset link to your email {email}. Kindly open your inbox and click on
        the link to change your password.
      </Typography>
    </Stack>
  );

  const form = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Grid container spacing={2} pb={4}>
        <Grid item xs={12}>
          <Typography pt={5} align="center" variant="h3" color="primary">
            {`Reset your password`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography pb={5}>
            Please enter the email associated with your account. You will receive a password reset
            link there.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            fullWidth
            value={email}
            error={emailError}
            helperText={emailError ? "Please enter valid email" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => navigate(ROUTE_LOGIN)}>Cancel</Button>
        </Grid>
        <Grid item xs={6}>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            loading={isLoading}
            loadingPosition={"end"}
            endIcon={<ArrowForwardOutlined />}
          >
            Send Email
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
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
            ${theme.palette.primary.main} 44%, transparent 44%)`,
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
        {isSuccess ? success : form}
      </Box>
    </Grid>
  );
};
