import { IconButton, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import React from "react";
import { AppRegistration, Delete, Edit, MoreVert } from "@mui/icons-material";
import MenuPopover from "../Reusable/MenuPopover";
import { Form } from "../../store/features/api";
import UpdateFormDialog from "./UpdateFormDialog";
import DeleteFormDialog from "./DeleteFormDialog";

export interface WorkspcaeMenuProps {
  form: Form;
}

const FormMenu = ({ form }: WorkspcaeMenuProps) => {
  const wsMenuAnchorRef = React.useRef(null);
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <IconButton ref={wsMenuAnchorRef} onClick={() => setOpen(true)}>
        <MoreVert />
      </IconButton>
      <MenuPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={wsMenuAnchorRef.current}
        sx={{ width: 150 }}
      >
        <MenuItem>
          <ListItemIcon>
            <AppRegistration />
          </ListItemIcon>
          <ListItemText>
            <Typography>Edit</Typography>
          </ListItemText>
        </MenuItem>
        <UpdateFormDialog
          form={form}
          onClose={() => setOpen(false)}
          button={
            <MenuItem>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText>
                <Typography>Rename</Typography>
              </ListItemText>
            </MenuItem>
          }
        />

        <DeleteFormDialog
          form={form}
          onSuccess={() => setOpen(false)}
          button={
            <MenuItem>
              <ListItemIcon>
                <Delete color="error" />
              </ListItemIcon>
              <ListItemText>
                <Typography color="error">Delete</Typography>
              </ListItemText>
            </MenuItem>
          }
        />
      </MenuPopover>
    </>
  );
};

export default FormMenu;
