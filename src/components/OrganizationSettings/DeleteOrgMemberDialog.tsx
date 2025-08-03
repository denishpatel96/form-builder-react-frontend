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
import { OrgMember, useDeleteOrgMemberMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const DeleteOrgMemberDialog = ({
  orgMember,
  onSuccess,
  button,
  disabled = false,
}: {
  orgMember: OrgMember;
  onSuccess?: () => void;
  button?: ReactNode;
  disabled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
  const [open, setOpen] = React.useState(false);
  const [deleteOrgMember, { isLoading, reset }] = useDeleteOrgMemberMutation();
  const [confirmText, setConfirmText] = React.useState<string>("");
  const handleClickOpen = () => {
    if (disabled) return;
    setOpen(true);
    setConfirmText("");
    reset();
  };

  const handleClose = () => {
    if (!isLoading) setOpen(false);
  };

  const handleSubmit = async () => {
    if (isLoading || confirmText !== "remove") return;
    const toastId = new Date().valueOf();
    try {
      await deleteOrgMember({ orgId: username, userId: orgMember.userId }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Org memeber removed successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error removing org member : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error removing org member",
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
            Remove from organization
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
          <DialogTitle>
            Remove {orgMember.firstName} {orgMember.lastName} from organization?
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2} py={2}>
              <Alert severity="error" variant="standard">
                Please note if you remove this member, all the access for this person will be lost.
                All the workspaces owned by this member will be transffered to your ownership.
              </Alert>

              <Typography py={2}>
                Type{" "}
                <em>
                  <strong>remove</strong>
                </em>{" "}
                to confirm remove action.
              </Typography>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                fullWidth
                variant="outlined"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
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
              disabled={confirmText !== "remove"}
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default DeleteOrgMemberDialog;
