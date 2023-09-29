import { ArrowForwardOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import * as React from "react";
import { HIDE_TOAST_DURATION } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import {
  useGetUserQuery,
  useUpdateCognitoUserNameMutation,
  useUpdateUserMutation,
} from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ChangeNameDialog = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useAppDispatch();
  const { accessToken, username } = useAppSelector((state) => state.auth);
  const { isFetching: isUserFetching, data: user } = useGetUserQuery(username, { skip: !username });
  const [
    updateCognitoUser,
    { isLoading: isUpdateCognitoUserLoading, reset: resetUpdateCognitoUser },
  ] = useUpdateCognitoUserNameMutation();
  const [updateUser, { isLoading: isUpdateUserLoading, reset: resetUpdateUser }] =
    useUpdateUserMutation();

  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState<string>(user ? user.firstName : "");
  const [lastName, setLastName] = React.useState<string>(user ? user.lastName : "");
  const handleClickOpen = () => {
    setOpen(true);
    setFirstName(user ? user.firstName : "");
    setLastName(user ? user.lastName : "");
    resetUpdateUser();
    resetUpdateCognitoUser();
  };

  const handleClose = () => {
    if (!isUpdateCognitoUserLoading && !isUpdateUserLoading) setOpen(false);
  };

  const handleSubmit = async () => {
    if (
      isUpdateCognitoUserLoading ||
      isUpdateUserLoading ||
      (firstName === user?.firstName && lastName === user.lastName)
    )
      return;
    const toastId = new Date().valueOf();
    try {
      await updateCognitoUser({ accessToken, firstName, lastName }).unwrap();
      await updateUser({ username: username, firstName, lastName }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Name changed successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error changing name : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error changing name",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Change Name
      </Button>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Change Your Name</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  fullWidth
                  required
                  margin="dense"
                  id="first-name"
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isUserFetching}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="last-name"
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isUserFetching}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isUpdateCognitoUserLoading || isUpdateUserLoading}
              variant="contained"
              loadingPosition={"end"}
              endIcon={<ArrowForwardOutlined />}
              type="submit"
              disabled={firstName === user?.firstName && lastName === user.lastName}
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ChangeNameDialog;
