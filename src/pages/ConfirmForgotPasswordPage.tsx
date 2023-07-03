import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Stack,
  IconButton,
  ListItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { HIDE_TOAST_DURATION, ROUTE_FORGOT_PASSWORD, ROUTE_LOGIN } from "../constants";
import {
  ArrowForwardOutlined,
  Cancel,
  CancelOutlined,
  CheckCircle,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import Logo from "../components/Reusable/Logo";
import Waves from "../components/Reusable/Waves";
import {
  hasCapitalLetter,
  hasNumber,
  hasProperCharacterCount,
  hasSmallLetter,
  hasSpecialCharacter,
  validatePassword,
} from "../helpers/validators";
import { useConfirmForgotPasswordMutation } from "../store/features/authApi";
import { hideToast, showToast } from "../store/features/signalSlice";

export const ConfirmForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const code = params.get("code") || "";

  const defaultValues = {
    password: "Iamcartoon@1",
    confirmPassword: "Iamcartoon@1",
    showPassword: false,
  };
  const [values, setValues] = React.useState<typeof defaultValues>(defaultValues);
  const defaultErrors = {
    password: "",
    confirmPassword: "",
  };
  const [errors, setErrors] = React.useState<typeof defaultErrors>(defaultErrors);

  const defaultPasswordValidations = {
    hasCount: hasProperCharacterCount(defaultValues.password, 8, 30),
    hasNumber: hasNumber(defaultValues.password),
    hasSmallLetter: hasSmallLetter(defaultValues.password),
    hasCapitalLetter: hasCapitalLetter(defaultValues.password),
    hasSpecialCharacter: hasSpecialCharacter(defaultValues.password),
  };
  const [passwordValidations, setPasswordValidations] = React.useState<
    typeof defaultPasswordValidations
  >(defaultPasswordValidations);

  const [confirmForgotPassword, { isLoading, isSuccess, isError, error }] =
    useConfirmForgotPasswordMutation();

  if (isError) {
    const toastId = new Date().valueOf();
    console.log("Error resetting password : ", error);
    dispatch(
      showToast({
        id: toastId,
        message: "Error reseting password",
        severity: "error",
      })
    );
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  }

  const handleSubmit = async () => {
    const isPasswordValid: boolean = validatePassword(values.password);
    const areBothPasswordsSame: boolean = !!(
      values.password && values.password === values.confirmPassword
    );

    // reset errors
    setErrors(defaultErrors);

    if (!isPasswordValid) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Please enter password that contains atleast 8 chars, capital letter, small letter, special letter and number.",
      }));
    } else if (!areBothPasswordsSame) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Please enter matching passwords.",
      }));
    } else {
      await confirmForgotPassword({
        password: values.password,
        email,
        code,
      });
    }
  };

  const validations = [
    {
      text: "should have atleast 8 characters",
      isValid: passwordValidations.hasCount,
    },
    {
      text: "should have capital letter",
      isValid: passwordValidations.hasCapitalLetter,
    },
    {
      text: "should have small letter",
      isValid: passwordValidations.hasSmallLetter,
    },
    {
      text: "should have number",
      isValid: passwordValidations.hasNumber,
    },
    {
      text: "should have special character",
      isValid: passwordValidations.hasSpecialCharacter,
    },
  ];

  const redirectToForgotPassword = (
    <Stack>
      <Cancel sx={{ height: 100, width: 100, margin: "auto" }} color="secondary" />
      <Typography variant="h3" textAlign={"center"}>
        Invalid link
      </Typography>
      <Typography py={6}>
        Password reset link is either broken or invalid. Please generate new link to reset the
        password by clicking the button below.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(ROUTE_FORGOT_PASSWORD)}
        endIcon={<ArrowForwardOutlined />}
      >
        Resend Link
      </Button>
    </Stack>
  );

  const success = (
    <Stack>
      <CheckCircle sx={{ height: 100, width: 100, margin: "auto" }} color="secondary" />
      <Typography variant="h3" textAlign={"center"}>
        Password changed successfully
      </Typography>
      <Typography py={6}>
        You have changed your password successfully. Now try login with your updated password.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(ROUTE_LOGIN)}
        endIcon={<ArrowForwardOutlined />}
      >
        Login
      </Button>
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
          <Typography py={5} align="center" variant="h3" color="primary">
            {`Change your password`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Password"
            autoComplete="new-password"
            fullWidth
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            error={!!errors.password}
            onChange={(e) => {
              const value = e.target.value;
              setPasswordValidations({
                hasCount: hasProperCharacterCount(value, 8, 30),
                hasNumber: hasNumber(value),
                hasSmallLetter: hasSmallLetter(value),
                hasCapitalLetter: hasCapitalLetter(value),
                hasSpecialCharacter: hasSpecialCharacter(value),
              });
              setValues((prev) => ({ ...prev, password: e.target.value }));
            }}
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
          <Stack pb={2}>
            {validations.map((item, index) => {
              return (
                <ListItem key={index} disablePadding disableGutters>
                  {item.isValid ? (
                    <CheckCircle sx={{ width: 15, height: 15 }} color={"primary"} />
                  ) : (
                    <CancelOutlined sx={{ width: 15, height: 15 }} />
                  )}
                  <Typography
                    sx={{ pl: 1 }}
                    variant="caption"
                    color={item.isValid ? "primary" : "inherit"}
                  >
                    {item.text}
                  </Typography>
                </ListItem>
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Confirm Password"
            autoComplete="off"
            fullWidth
            type={"password"}
            value={values.confirmPassword}
            onChange={(e) => setValues((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => navigate(ROUTE_FORGOT_PASSWORD)}>Resend Link</Button>
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
            Submit
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
        {!(email && code) ? redirectToForgotPassword : isSuccess ? success : form}
      </Box>
    </Grid>
  );
};
