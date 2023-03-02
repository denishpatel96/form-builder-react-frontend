import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface IRemoveFieldDialogProps {
  isOpen: boolean;
  fieldName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const RemoveFieldDialog = ({ isOpen, fieldName, onClose, onConfirm }: IRemoveFieldDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="Confirm to remove form element">
      <DialogTitle id="confirm-remove-element-dialog">Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please note that this will delete the element - <strong>{fieldName}</strong>. You will not
          be able to undo that.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          CANCEL
        </Button>
        <Button color="error" onClick={onConfirm} autoFocus>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveFieldDialog;
