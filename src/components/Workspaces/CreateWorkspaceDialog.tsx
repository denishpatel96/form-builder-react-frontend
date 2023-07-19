import { Add, ArrowForwardOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as React from "react";
import { HIDE_TOAST_DURATION } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { useCreateWorkspaceMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const CreateWorkspaceDialog = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const [open, setOpen] = React.useState(false);
  const [createWorkspace, { isLoading, reset }] = useCreateWorkspaceMutation();
  const [name, setName] = React.useState<string>("");
  const handleClickOpen = () => {
    setOpen(true);
    setName("");
    reset();
  };

  const handleClose = () => {
    if (!isLoading) setOpen(false);
  };

  const handleSubmit = async () => {
    const toastId = new Date().valueOf();
    try {
      await createWorkspace({ userSub: userId, name }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Workspace created successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error creating workspace : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error creating workspace",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  return (
    <div>
      <Button fullWidth startIcon={<Add />} variant="contained" onClick={handleClickOpen}>
        Create Workspace
      </Button>
      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter name to create a new workspace.</DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Workspace Name"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              loadingPosition={"end"}
              endIcon={<ArrowForwardOutlined />}
              type="submit"
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateWorkspaceDialog;
