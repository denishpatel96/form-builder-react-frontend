import { IconButton, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  LogoutOutlined,
  MoreVert,
  PersonAddOutlined,
} from "@mui/icons-material";
import MenuPopover from "../Reusable/MenuPopover";
import DeleteWorkspaceDialog from "./DeleteWorkspaceDialog";
import { Workspace } from "../../store/features/api";
import RenameWorkspaceDialog from "./RenameWorkspaceDialog";

export interface WorkspcaeMenuProps {
  open: boolean;
  onChange: (open: boolean) => void;
  workspace: Workspace;
}

const WorkspaceMenu = ({ open, onChange, workspace }: WorkspcaeMenuProps) => {
  const wsMenuAnchorRef = React.useRef(null);
  return (
    <>
      <IconButton ref={wsMenuAnchorRef} onClick={() => onChange(true)}>
        <MoreVert />
      </IconButton>
      <MenuPopover
        open={open}
        onClose={() => onChange(false)}
        anchorEl={wsMenuAnchorRef.current}
        sx={{ width: 150 }}
      >
        <RenameWorkspaceDialog
          workspaceName={workspace.name}
          onClose={() => onChange(false)}
          workspaceId={workspace.id}
          disabled={workspace.isDefault}
          button={
            <MenuItem>
              <ListItemIcon>
                <EditOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography>Rename</Typography>
              </ListItemText>
            </MenuItem>
          }
        />

        <MenuItem
          onClick={() => {
            // TODO : do something
          }}
        >
          <ListItemIcon>
            <PersonAddOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem
          disabled={workspace.isDefault}
          onClick={() => {
            // TODO : do something
          }}
        >
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Leave</ListItemText>
        </MenuItem>

        <DeleteWorkspaceDialog
          workspaceName={workspace.name}
          onSuccess={() => onChange(false)}
          workspaceId={workspace.id}
          disabled={workspace.isDefault}
          button={
            <MenuItem disabled={workspace.isDefault}>
              <ListItemIcon>
                <DeleteOutlined color="error" fontSize="small" />
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

export default WorkspaceMenu;
