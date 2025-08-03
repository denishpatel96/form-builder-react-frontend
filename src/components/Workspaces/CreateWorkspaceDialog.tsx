import { ArrowForwardOutlined } from "@mui/icons-material";
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
import React, { ReactNode } from "react";
import { HIDE_TOAST_DURATION, NAME_CHARACTER_LIMIT } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { useCreateWorkspaceMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const CreateWorkspaceDialog = ({
  onSuccess,
  button,
}: {
  onSuccess?: () => void;
  button?: ReactNode;
}) => {
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
    if (isLoading) return;
    const toastId = new Date().valueOf();
    try {
      await createWorkspace({
        orgId: username,
        workspaceName: name.trim(),
      }).unwrap();
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
      <Box component="span" sx={{ width: "auto" }} onClick={handleClickOpen}>
        {button || <Button variant="contained">Create Workspace</Button>}
      </Box>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Create a workspace</DialogTitle>
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
                inputProps={{ maxlength: NAME_CHARACTER_LIMIT }}
                helperText={`${name.length}/${NAME_CHARACTER_LIMIT}`}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button size="large" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              size="large"
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
