import { ArrowForwardOutlined, DeleteOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import { HIDE_TOAST_DURATION } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { useDeleteWorkspaceMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import SuccessAnimated from "../Reusable/SuccessAnimated";

const DeleteWorkspaceDialog = ({
  workspaceId,
  workspaceName,
  onSuccess,
  button,
  disabled = false,
}: {
  workspaceId: string;
  workspaceName: string;
  onSuccess?: () => void;
  button: ReactNode;
  disabled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const [open, setOpen] = React.useState(false);
  const [deleteWorkspace, { isLoading, reset }] = useDeleteWorkspaceMutation();
  const [name, setName] = React.useState<string>("");
  const handleClickOpen = () => {
    if (disabled) return;
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
      await deleteWorkspace({ userSub: userId, workspaceId }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Workspace deleted successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error deleting workspace : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error deleting workspace",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        {button || (
          <Button fullWidth startIcon={<DeleteOutlined />} onClick={handleClickOpen}>
            Delete
          </Button>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Delete Workspace</DialogTitle>

          <DialogContent>
            <Stack spacing={2}>
              <DialogContentText>
                <Typography>
                  Please note that deleting this workspace will delete all the containing forms and
                  their responses permanently.
                </Typography>
                <Typography>It will be impossible to recover them later.</Typography>

                <Typography pt={2}>
                  Type workspace name <strong>{workspaceName}</strong> to confirm delete action.
                </Typography>
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              loadingPosition={"end"}
              endIcon={<ArrowForwardOutlined />}
              type="submit"
              color="error"
              disabled={name !== workspaceName}
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default DeleteWorkspaceDialog;
