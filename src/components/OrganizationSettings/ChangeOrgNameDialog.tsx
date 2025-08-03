import { ArrowForwardOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
} from "@mui/material";
import * as React from "react";
import { HIDE_TOAST_DURATION } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { useGetUserQuery, useUpdateUserMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ChangeOrgNameDialog = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.auth);
  const { isFetching: isUserFetching, data: user } = useGetUserQuery(username, { skip: !username });
  const [updateUser, { isLoading: isUpdateUserLoading, reset: resetUpdateUser }] =
    useUpdateUserMutation();

  const [open, setOpen] = React.useState(false);
  const [orgName, setOrgName] = React.useState<string>(user ? user.orgName : "");
  const handleClickOpen = () => {
    setOpen(true);
    setOrgName(user ? user.orgName : "");
    resetUpdateUser();
  };

  const handleClose = () => {
    if (!isUpdateUserLoading) setOpen(false);
  };

  const handleSubmit = async () => {
    const toastId = new Date().valueOf();
    try {
      await updateUser({ username, orgName }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Organization name changed successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error changing organization name : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error changing organization name",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Change Organization Name
      </Button>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Change Organization Name</DialogTitle>
          <DialogContent>
            <Stack py={2}>
              <TextField
                autoFocus
                fullWidth
                required
                margin="dense"
                id="org-name"
                label="Organization Name"
                variant="outlined"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                disabled={isUserFetching}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isUpdateUserLoading}
              variant="contained"
              loadingPosition={"end"}
              endIcon={<ArrowForwardOutlined />}
              type="submit"
              disabled={orgName === user?.orgName}
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ChangeOrgNameDialog;
