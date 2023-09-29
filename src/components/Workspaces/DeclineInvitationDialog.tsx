import { ArrowForwardOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { ReactNode } from "react";

const DeclineInvitationDialog = ({
  onSuccess,
  button,
  disabled = false,
}: {
  onSuccess?: () => void;
  button?: ReactNode;
  disabled?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    if (disabled) return;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        {button || (
          <Button fullWidth onClick={handleClickOpen}>
            Decline
          </Button>
        )}
      </Box>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <DialogTitle>Decline Organization Invitation?</DialogTitle>

        <DialogContent>
          <DialogContentText>Are you sure you want to decline this invitation?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForwardOutlined />}
            onClick={() => onSuccess && onSuccess()}
          >
            Decline
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeclineInvitationDialog;
