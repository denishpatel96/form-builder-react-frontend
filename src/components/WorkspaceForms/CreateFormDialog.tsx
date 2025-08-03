import { Add, ArrowForwardOutlined } from "@mui/icons-material";
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
import { useCreateFormMutation } from "../../store/features/api";
import { useAppDispatch } from "../../store/hooks";
import { useParams } from "react-router-dom";

const CreateFormDialog = ({
  onSuccess,
  button,
}: {
  onSuccess?: () => void;
  button?: ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const { orgId, workspaceId } = useParams() as { orgId: string; workspaceId: string };
  const [open, setOpen] = React.useState(false);
  const [createForm, { isLoading, reset }] = useCreateFormMutation();
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
      await createForm({
        orgId: orgId,
        workspaceId: workspaceId,
        formName: name.trim(),
      }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Form created successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error creating form : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error creating form",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  return (
    <Box>
      <Box component="span" sx={{ width: "auto" }} onClick={handleClickOpen}>
        {button || (
          <Button startIcon={<Add />} variant="contained">
            Create Form
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
          <DialogTitle>Create a form</DialogTitle>
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

export default CreateFormDialog;
