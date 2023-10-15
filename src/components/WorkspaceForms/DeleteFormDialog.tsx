import { ArrowForwardOutlined, DeleteOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import { HIDE_TOAST_DURATION } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { Form, useDeleteFormMutation } from "../../store/features/api";
import { useAppDispatch } from "../../store/hooks";

const DeleteFormDialog = ({
  form,
  onSuccess,
  button,
  disabled = false,
}: {
  form: Form;
  onSuccess?: () => void;
  button?: ReactNode;
  disabled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [deleteForm, { isLoading, reset }] = useDeleteFormMutation();
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
    if (isLoading || name !== form.name) return;
    const toastId = new Date().valueOf();
    try {
      await deleteForm({
        orgId: form.orgId,
        workspaceId: form.workspaceId,
        formId: form.formId,
      }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Form deleted successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error deleting form : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error deleting form",
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
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>Delete Form</DialogTitle>

          <DialogContent>
            <Stack spacing={2} py={2}>
              <Alert severity="error" variant="standard">
                Please note that deleting this form will delete all of its responses permanently. It
                will be impossible to recover them later.
              </Alert>

              <Typography py={2}>
                Type form name{" "}
                <em>
                  <strong>{form.name}</strong>
                </em>{" "}
                to confirm delete action.
              </Typography>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              endIcon={<ArrowForwardOutlined />}
              type="submit"
              color="error"
              disabled={name !== form.name}
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default DeleteFormDialog;
