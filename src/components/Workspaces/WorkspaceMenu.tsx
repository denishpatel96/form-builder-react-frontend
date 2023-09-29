import { IconButton, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import React from "react";
import { Delete, Logout, MoreVert, Update } from "@mui/icons-material";
import MenuPopover from "../Reusable/MenuPopover";
import DeleteWorkspaceDialog from "./DeleteWorkspaceDialog";
import { Workspace } from "../../store/features/api";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_WORKSPACES } from "../../constants";
import UpdateWorkspaceDialog from "./UpdateWorkspaceDialog";

export interface WorkspcaeMenuProps {
  workspace: Workspace;
}

const WorkspaceMenu = ({ workspace }: WorkspcaeMenuProps) => {
  const wsMenuAnchorRef = React.useRef(null);
  const navigate = useNavigate();
  const { orgId } = useParams() as { orgId: string };
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
        <UpdateWorkspaceDialog
          workspaceName={workspace.name}
          onClose={() => setOpen(false)}
          workspaceId={workspace.workspaceId}
          button={
            <MenuItem>
              <ListItemIcon>
                <Update />
              </ListItemIcon>
              <ListItemText>
                <Typography>Update</Typography>
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
            <Logout />
          </ListItemIcon>
          <ListItemText>Leave</ListItemText>
        </MenuItem>

        <DeleteWorkspaceDialog
          workspaceName={workspace.name}
          onSuccess={() => {
            setOpen(false);
            navigate(ROUTE_WORKSPACES.replace(":orgId", orgId));
          }}
          workspaceId={workspace.workspaceId}
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

export default WorkspaceMenu;
