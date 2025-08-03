import {
  ArrowForwardOutlined,
  CancelOutlined,
  CheckCircle,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  DialogTitle,
  TextField,
  Stack,
  ListItem,
  Typography,
  DialogContentText,
} from "@mui/material";
import * as React from "react";
import { HIDE_TOAST_DURATION } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { useChangePasswordMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  hasCapitalLetter,
  hasNumber,
  hasProperCharacterCount,
  hasSmallLetter,
  hasSpecialCharacter,
} from "../../helpers/validators";

const ChangePasswordDialog = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [previousPassword, setPreviousPassword] = React.useState<string>("");
  const [proposedPassword, setProposedPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [changePassword, { isLoading: isChangingPassword, reset: resetChangePassword }] =
    useChangePasswordMutation();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setPreviousPassword("");
    setProposedPassword("");
    resetChangePassword();
    setShowPassword(false);
    setShowNewPassword(false);
  };

  const handleClose = () => {
    if (!isChangingPassword) setOpen(false);
  };

  const handleSubmit = async () => {
    if (isChangingPassword || previousPassword === proposedPassword) return;
    const toastId = new Date().valueOf();
    try {
      await changePassword({ accessToken, previousPassword, proposedPassword }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Password changed successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error changing password : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error changing password",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  const defaultPasswordValidations = {
    hasCount: hasProperCharacterCount(proposedPassword, 8, 30),
    hasNumber: hasNumber(proposedPassword),
    hasSmallLetter: hasSmallLetter(proposedPassword),
    hasCapitalLetter: hasCapitalLetter(proposedPassword),
    hasSpecialCharacter: hasSpecialCharacter(proposedPassword),
  };
  const [passwordValidations, setPasswordValidations] = React.useState<
    typeof defaultPasswordValidations
  >(defaultPasswordValidations);

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
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Change Password
      </Button>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Change Your Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can change your password here if you already know your current password.
              Otherwise, use forgot password at login screen.
            </DialogContentText>

            <TextField
              sx={{ mt: 4 }}
              autoFocus
              fullWidth
              required
              autoComplete="password"
              type={showPassword ? "text" : "password"}
              margin="dense"
              id="current-password"
              label="Current Password"
              variant="outlined"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              required
              fullWidth
              type={showNewPassword ? "text" : "password"}
              margin="dense"
              autoComplete="new-password"
              id="proposed-password"
              label="New Password"
              variant="outlined"
              value={proposedPassword}
              onChange={(e) => {
                const value = e.target.value?.trim();
                setPasswordValidations({
                  hasCount: hasProperCharacterCount(value, 8, 30),
                  hasNumber: hasNumber(value),
                  hasSmallLetter: hasSmallLetter(value),
                  hasCapitalLetter: hasCapitalLetter(value),
                  hasSpecialCharacter: hasSpecialCharacter(value),
                });
                setProposedPassword(value);
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                  </IconButton>
                ),
              }}
            />
            <Stack py={2}>
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
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isChangingPassword}
              variant="contained"
              loadingPosition={"end"}
              endIcon={<ArrowForwardOutlined />}
              type="submit"
              disabled={previousPassword === proposedPassword}
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ChangePasswordDialog;
