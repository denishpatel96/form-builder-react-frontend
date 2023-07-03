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

export interface WorkspcaeMenuProps {
  open: boolean;
  onChange: (open: boolean) => void;
}

const WorkspaceMenu = ({ open, onChange }: WorkspcaeMenuProps) => {
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
        <MenuItem
          onClick={() => {
            // TODO : do something
          }}
        >
          <ListItemIcon>
            <EditOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>
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
          onClick={() => {
            // TODO : do something
          }}
        >
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Leave</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            // TODO : do something
          }}
        >
          <ListItemIcon>
            <DeleteOutlined color="error" fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error">Delete</Typography>
          </ListItemText>
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default WorkspaceMenu;
