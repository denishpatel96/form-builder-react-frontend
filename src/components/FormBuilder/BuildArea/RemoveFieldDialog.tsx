import { ArrowForwardOutlined, ChevronRight } from "@mui/icons-material";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { FORM_ELEMENTS_LIST } from "../../../constants";
import { IFieldProps } from "../Types";

interface IRemoveFieldDialogProps {
  isOpen: boolean;
  fields: IFieldProps[];
  onClose: () => void;
  onConfirm: () => void;
}

const RemoveFieldDialog = ({ isOpen, fields, onClose, onConfirm }: IRemoveFieldDialogProps) => {
  const fieldNames = [
    ...fields.map((field) => {
      const { fieldType, label } = field;
      const type = FORM_ELEMENTS_LIST.find((el) => el.id === fieldType)?.label;
      return `${label} (${type})`;
    }),
  ];
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={isOpen}
      onClose={onClose}
      aria-labelledby="Confirm to remove form element"
    >
      <DialogTitle id="confirm-remove-element-dialog">Delete the fields?</DialogTitle>
      <DialogContent>
        <Stack spacing={2} py={2}>
          <Alert severity="error" variant="standard">
            Please note that this will delete the follwing{" "}
            <strong>{fieldNames.length} fields</strong> and their collected responses. You will not
            be able to undo that.
            <List>
              {fieldNames.map((f, i) => (
                <ListItem disableGutters disablePadding key={i}>
                  <ChevronRight />
                  <ListItemText>
                    <Typography variant="body1">{f}</Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardOutlined />}
          color="error"
          onClick={onConfirm}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveFieldDialog;
