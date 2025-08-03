import { IconButton, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import React from "react";
import { AppRegistration, Delete, Edit, MoreVert, Visibility } from "@mui/icons-material";
import MenuPopover from "../Reusable/MenuPopover";
import { Form } from "../../store/features/api";
import UpdateFormDialog from "./UpdateFormDialog";
import DeleteFormDialog from "./DeleteFormDialog";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_FORM_BUILDER, ROUTE_RESPONSES } from "../../constants";
import { openInNewTab } from "../../helpers/functions";

export interface WorkspcaeMenuProps {
  form: Form;
}

const FormMenu = ({ form }: WorkspcaeMenuProps) => {
  const wsMenuAnchorRef = React.useRef(null);
  const naviagte = useNavigate();
  const { orgId, workspaceId } = useParams() as { orgId: string; workspaceId: string };
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <IconButton
        ref={wsMenuAnchorRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <MoreVert />
      </IconButton>
      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={wsMenuAnchorRef.current}>
        <MenuItem
          onClick={() => {
            openInNewTab(
              ROUTE_FORM_BUILDER.replace(":orgId", orgId)
                .replace(":workspaceId", workspaceId)
                .replace(":formId", form.formId)
            );
            setOpen(false);
          }}
        >
          <ListItemIcon>
            <AppRegistration />
          </ListItemIcon>
          <ListItemText>
            <Typography>Edit</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            naviagte(
              ROUTE_RESPONSES.replace(":orgId", orgId)
                .replace(":workspaceId", workspaceId)
                .replace(":formId", form.formId)
            );
            setOpen(false);
          }}
        >
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          <ListItemText>
            <Typography>View Responses</Typography>
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
