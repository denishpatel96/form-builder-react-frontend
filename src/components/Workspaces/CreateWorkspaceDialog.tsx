import { Add, ArrowForwardOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { HIDE_TOAST_DURATION } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { useCreateWorkspaceMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const CreateWorkspaceDialog = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
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
      await createWorkspace({ username: username, name }).unwrap();
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
    <Box>
      <Button endIcon={<Add />} variant="contained" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Create a workspace</DialogTitle>
          <DialogContent>
            <Typography pt={2}>Enter a name for the workspace</Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Workspace Name"
              fullWidth
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
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
    </Box>
  );
};

export default CreateWorkspaceDialog;
