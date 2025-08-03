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
import { HIDE_TOAST_DURATION, NAME_CHARACTER_LIMIT } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { Form, useUpdateFormMutation } from "../../store/features/api";
import { useAppDispatch } from "../../store/hooks";

const UpdateFormDialog = ({
  form,
  onSuccess,
  onClose,
  button,
}: {
  form: Form;
  onSuccess?: () => void;
  onClose?: () => void;
  button: React.ReactNode;
  disabled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [updateForm, { isLoading, reset }] = useUpdateFormMutation();
  const [name, setName] = React.useState<string>(form.name);
  const handleClickOpen = () => {
    setOpen(true);
    setName(form.name);
    reset();
  };

  const handleClose = () => {
    if (!isLoading) {
      if (onClose) onClose();
      setOpen(false);
    }
  };

  const handleSubmit = async () => {
    if (isLoading || form.name === name) return;
    const toastId = new Date().valueOf();
    try {
      await updateForm({
        orgId: form.orgId,
        workspaceId: form.workspaceId,
        formId: form.formId,
        name,
      }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Form renamed successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error renaming form : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error renaming form",
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
          <DialogTitle>Rename Form</DialogTitle>
          <DialogContent>
            <Stack spacing={2} py={2}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="Form Name"
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
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              loadingPosition={"end"}
              disabled={form.name === name}
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

export default UpdateFormDialog;
