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
import { useGetUserQuery, useUpdateUserMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ChangeNameDialog = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const { isFetching: isUserFetching, data: user } = useGetUserQuery(userId, { skip: !userId });
  const [open, setOpen] = React.useState(false);
  const [updateUser, { isLoading, reset }] = useUpdateUserMutation();
  const [firstName, setFirstName] = React.useState<string>(user ? user.firstName : "");
  const [lastName, setLastName] = React.useState<string>(user ? user.lastName : "");
  const handleClickOpen = () => {
    setOpen(true);
    setFirstName(user ? user.firstName : "");
    setLastName(user ? user.lastName : "");
    reset();
  };

  const handleClose = () => {
    if (!isLoading) setOpen(false);
  };

  const handleSubmit = async () => {
    const toastId = new Date().valueOf();
    try {
      await updateUser({ userSub: userId, firstName, lastName }).unwrap();
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
      <Dialog open={open} onClose={handleClose}>
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
                  variant="standard"
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
                  variant="standard"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isUserFetching}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loading={isLoading}
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
