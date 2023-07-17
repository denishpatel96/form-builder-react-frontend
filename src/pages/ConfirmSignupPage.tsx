import React from "react";
import { Grid, Typography, Button, TextField, Box, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { HIDE_TOAST_DURATION, ROUTE_LOGIN } from "../constants";
import { ArrowForwardOutlined, CheckCircle, MarkEmailRead } from "@mui/icons-material";
import Logo from "../components/Reusable/Logo";
import Waves from "../components/Reusable/Waves";
import { validateEmail } from "../helpers/validators";
import { useConfirmSignupMutation, useResendCodeMutation } from "../store/features/api";
import { hideToast, showToast } from "../store/features/signalSlice";
import Spinner from "../components/Reusable/Spinner";

export const ConfirmSignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const emailParam = params.get("email") || "";
  const code = params.get("code");

  const [email, setEmail] = React.useState<string>(emailParam);
  const [emailError, setEmailError] = React.useState<boolean>(false);

  const [
    confirmSignup,
    {
      isLoading: isConfirming,
      isSuccess: isConfirmed,
      isError: isConfirmError,
      error: confirmationError,
    },
  ] = useConfirmSignupMutation();

  const [
    resendCode,
    { isLoading: isResending, isSuccess: isResent, isError: isResendError, error: resendError },
  ] = useResendCodeMutation();

  React.useEffect(() => {
    const AsyncFunc = async () => {
      if (email && code) {
        await confirmSignup({ email, code });
      }
    };

    AsyncFunc();
  }, []);

  if (isConfirmError) {
    const toastId = new Date().valueOf();
    console.log("Error confirming the account : ", confirmationError);
    dispatch(
      showToast({
        id: toastId,
        message: "Error confirming the account",
        severity: "error",
      })
    );
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  }
  if (isResendError) {
    const toastId = new Date().valueOf();
    console.log("Error resending account verification link : ", resendError);
    dispatch(
      showToast({
        id: toastId,
        message: "Error resending account verification link",
        severity: "error",
      })
    );
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  }

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError(true);
    } else {
      try {
        await resendCode({ email });
      } catch (error: any) {
        console.log("Error sending account confirmation link", error);
      }
    }
  };

  const confirmationSuccessful = (
    <Stack>
      <CheckCircle sx={{ height: 100, width: 100, margin: "auto" }} color="secondary" />
      <Typography variant="h3" textAlign={"center"}>
        Account confirmed successfully
      </Typography>
      <Typography py={6} textAlign={"center"}>
        Thank you for confirming your account. Now, you can proceed to login into your account.
      </Typography>
      <Button
        variant="contained"
        endIcon={<ArrowForwardOutlined />}
        onClick={() => navigate(ROUTE_LOGIN)}
      >
        Login
      </Button>
    </Stack>
  );

  const resendSuccessful = (
    <Stack>
      <MarkEmailRead sx={{ height: 100, width: 100, margin: "auto" }} color="secondary" />
      <Typography variant="h3" textAlign={"center"}>
        Verification link sent
      </Typography>
      <Typography py={6}>
        We have sent verification link to your email {email}. Kindly open your inbox and click on
        the link to confirm your account.
      </Typography>
    </Stack>
  );

  const resendCodeForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Grid container spacing={2} pb={4}>
        <Grid item xs={12}>
          <Typography pt={5} align="center" variant="h3" color="primary">
            {`Confirm your account`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography pb={5}>
            Your account is not confirmed. For security purposes, we need to verify your email
            associated with the account first.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography pb={5}>
            Please enter the email associated with your account. You will receive an account
            confirmation link there.
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
            loading={isResending}
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
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: 2,
          mt: 2,
          p: 5,
          width: { xs: "100%", sm: "500px" },
        }}
      >
        {/* If confirming show progress bar or spinner */}
        {isConfirming && <Spinner text={"Confirming your account..."} />}
        {/* If confirmed show success message with login button */}
        {isConfirmed && confirmationSuccessful}
        {/* If confirmation failed show error message with resend code button  */}
        {/* If no email and code provided then show information with resend code button */}
        {!(isConfirming || isConfirmed || isResent) && resendCodeForm}

        {/* If verification link resent successfully */}
        {isResent && resendSuccessful}
      </Box>
    </Grid>
  );
};
