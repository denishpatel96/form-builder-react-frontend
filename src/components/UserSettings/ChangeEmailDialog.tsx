import { ArrowForwardOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
} from "@mui/material";
import * as React from "react";
import { HIDE_TOAST_DURATION, ROUTE_LOGIN } from "../../constants";
import { hideToast, resetSignalState, showToast } from "../../store/features/signalSlice";
import api, {
  useGetUserQuery,
  useLogoutMutation,
  useUpdateCognitoUserEmailMutation,
  useUpdateUserMutation,
  useVerifyCognitoUserEmailMutation,
} from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { resetFormState } from "../../store/features/formSlice";
import { resetAuthState } from "../../store/features/authSlice";
import { CookieStorage } from "../../helpers/cookieStorage";

const ChangeEmailDialog = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username, accessToken } = useAppSelector((state) => state.auth);
  const { isFetching: isUserFetching, data: user } = useGetUserQuery(username, { skip: !username });
  const [updateEmail, { isLoading: sending, isSuccess: codeSent, reset: resetUpdateEmail }] =
    useUpdateCognitoUserEmailMutation();
  const [verifyEmail, { isLoading: verifying, reset: resetVerifyEmail }] =
    useVerifyCognitoUserEmailMutation();

  const [logout] = useLogoutMutation();
  const [updateUser, { isLoading: isUpdateUserLoading, reset: resetUpdateUser }] =
    useUpdateUserMutation();
  const [open, setOpen] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");

  const reset = () => {
    setNewEmail("");
    setPassword("");
    setCode("");
    resetVerifyEmail();
    resetUpdateEmail();
    resetUpdateUser();
  };

  const handleClickOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = (_event: Object, reason: string) => {
    if (reason && reason == "backdropClick") return;
    setOpen(false);
  };

  const handleSendCode = async () => {
    const toastId = new Date().valueOf();
    try {
      await updateEmail({ password, email: newEmail }).unwrap();
      dispatch(
        showToast({
          id: toastId,
          message: "Verification code sent successfully",
          severity: "success",
        })
      );
    } catch (error) {
      console.log("Error sending verification code : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error sending verification code",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  const handleLogout = () => {
    const { rT, idT } = CookieStorage.getAll();
    if (rT && idT) logout({ token: rT });
    // clear api cache
    dispatch(api.util.resetApiState());
    dispatch(resetFormState());
    dispatch(resetAuthState());
    dispatch(resetSignalState());
    // remove from cookie
    CookieStorage.clear();
    // go to home page
    navigate(`${ROUTE_LOGIN}?event=emailChanged`);
  };

  const handleVerifyEmail = async () => {
    const toastId = new Date().valueOf();

    try {
      await verifyEmail({ accessToken, code }).unwrap();
      await updateUser({ username, email: newEmail }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Email verified successfully",
          severity: "success",
        })
      );
      handleLogout();
    } catch (error) {
      console.log("Error verifying email : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error verifying email",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  const sendCodeForm = (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleSendCode();
      }}
    >
      <DialogTitle>Change Your Email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide your current password to verify your identity and new email address.
        </DialogContentText>
        <TextField
          sx={{ mt: 4 }}
          required
          autoFocus
          fullWidth
          autoComplete="new-password"
          type={"password"}
          margin="dense"
          id="password"
          label="Current Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isUserFetching}
        />
        <TextField
          fullWidth
          required
          autoComplete="off"
          margin="dense"
          id="new-email"
          label="New Email"
          variant="outlined"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          disabled={isUserFetching}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <LoadingButton
          loading={sending}
          variant="contained"
          loadingPosition={"end"}
          endIcon={<ArrowForwardOutlined />}
          type="submit"
          disabled={newEmail === user?.email}
        >
          Send Code
        </LoadingButton>
      </DialogActions>
    </form>
  );

  const verifyEmailForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleVerifyEmail();
      }}
    >
      <DialogTitle>Verify Your Email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You should have received verification code in your new email inbox. Please check your
          inbox for verification code and paste it here.
        </DialogContentText>
        <TextField
          sx={{ mt: 4 }}
          required
          fullWidth
          autoComplete="one-time-password"
          margin="dense"
          id="verification-code"
          label="Verification code"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={() => reset()}>
          Restart
        </Button>
        <LoadingButton
          loading={verifying || isUpdateUserLoading}
          variant="contained"
          loadingPosition={"end"}
          endIcon={<ArrowForwardOutlined />}
          type="submit"
          disabled={newEmail === user?.email}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </form>
  );

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Change Email
      </Button>
      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
        {codeSent ? verifyEmailForm : sendCodeForm}
      </Dialog>
    </>
  );
};

export default ChangeEmailDialog;
