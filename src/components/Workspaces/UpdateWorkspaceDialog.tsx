import { ArrowForwardOutlined, EditOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import * as React from "react";
import { HIDE_TOAST_DURATION, WS_NAME_CHARACTER_LIMIT } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { useUpdateWorkspaceMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const UpdateWorkspaceDialog = ({
  workspaceId,
  workspaceName,
  onSuccess,
  onClose,
  button,
}: {
  workspaceId: string;
  workspaceName: string;
  onSuccess?: () => void;
  onClose?: () => void;
  button: React.ReactNode;
  disabled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
  const [open, setOpen] = React.useState(false);
  const [updateWorkspace, { isLoading, reset }] = useUpdateWorkspaceMutation();
  const [name, setName] = React.useState<string>(workspaceName);
  const handleClickOpen = () => {
    setOpen(true);
    setName(workspaceName);
    reset();
  };

  const handleClose = () => {
    if (!isLoading) {
      if (onClose) onClose();
      setOpen(false);
    }
  };

  const handleSubmit = async () => {
    if (isLoading || workspaceName === name) return;
    const toastId = new Date().valueOf();
    try {
      await updateWorkspace({ orgId: username, workspaceId, name }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Workspace updated successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error updating workspace : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error updating workspace",
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
          <Button fullWidth startIcon={<EditOutlined />} onClick={handleClickOpen}>
            Rename
          </Button>
        )}
      </Box>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Rename Workspace</DialogTitle>
          <DialogContent>
            <Stack spacing={2} py={2}>
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
                inputProps={{ maxlength: WS_NAME_CHARACTER_LIMIT }}
                helperText={`${name.length}/${WS_NAME_CHARACTER_LIMIT}`}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              loadingPosition={"end"}
              disabled={workspaceName === name}
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

export default UpdateWorkspaceDialog;
