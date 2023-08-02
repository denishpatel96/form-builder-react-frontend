import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  ListItem,
  Stack,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { ROUTE_LOGIN } from "../constants";
import {
  ArrowForwardOutlined,
  CancelOutlined,
  CheckCircle,
  MarkEmailRead,
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
  validateEmail,
  validatePassword,
} from "../helpers/validators";
import { useSignupMutation } from "../store/features/api";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [signup, { isLoading, isSuccess, isError, error }] = useSignupMutation();
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  };
  const [values, setValues] = React.useState<typeof defaultValues>(defaultValues);
  const defaultErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

  const handleSubmit = async () => {
    const isFirstNameValid: boolean = !!values.firstName;
    const isLastNameValid: boolean = !!values.lastName;
    const isEmailValid: boolean = validateEmail(values.email);
    const isPasswordValid: boolean = validatePassword(values.password);

    // reset errors
    setErrors(defaultErrors);

    if (!isFirstNameValid) {
      setErrors((prev) => ({ ...prev, firstName: "Please enter first name." }));
    } else if (!isLastNameValid) {
      setErrors((prev) => ({ ...prev, lastName: "Please enter last name." }));
    } else if (!isEmailValid) {
      setErrors((prev) => ({ ...prev, email: "Please enter valid email." }));
    } else if (!isPasswordValid) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Please enter password that contains atleast 8 chars, capital letter, small letter, special letter and number.",
      }));
    } else {
      await signup({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });
    }
  };

  if (isError) {
    console.log("Error creating an account : ", error);
  }

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

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh)",
        minHeight: 900,
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
        {isSuccess ? (
          <Stack>
            <MarkEmailRead sx={{ height: 100, width: 100, margin: "auto" }} color="secondary" />
            <Typography variant="h3" textAlign={"center"}>
              Verification link sent
            </Typography>
            <Typography py={6}>
              We have sent verification link to your email <strong>{values.email}</strong>. Kindly
              open your inbox and click on the link to confirm your account.
            </Typography>
          </Stack>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Grid container spacing={2} pb={4}>
                <Grid item xs={12}>
                  <Typography py={5} align="center" variant="h3" color="primary">
                    {`Create an account`}
                  </Typography>
                </Grid>
                {isError && error && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      {
                        (
                          error as {
                            data: {
                              name: string;
                              message: string;
                              stack: string;
                            };
                            status: number;
                          }
                        )?.data?.message
                      }
                    </Alert>
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    autoComplete="given-name"
                    label="First Name"
                    fullWidth
                    value={values.firstName}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, firstName: e.target.value?.trim() }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    autoComplete="family-name"
                    label="Last Name"
                    fullWidth
                    value={values.lastName}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, lastName: e.target.value?.trim() }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Email"
                    autoComplete="email"
                    fullWidth
                    value={values.email}
                    error={!!errors.email}
                    helperText={errors.email}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, email: e.target.value?.trim() }))
                    }
                  />
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
                      setValues((prev) => ({ ...prev, password: e.target.value?.trim() }));
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
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                    loadingPosition={"end"}
                    endIcon={<ArrowForwardOutlined />}
                  >
                    Create an account
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
            <Button fullWidth onClick={() => navigate(ROUTE_LOGIN)}>
              <Typography variant="body2">Already have an account?</Typography>
            </Button>
          </>
        )}
      </Box>
    </Grid>
  );
};
