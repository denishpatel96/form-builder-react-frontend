import React from "react";
import Appbar from "../Reusable/Appbar";
import LeftSidebar from "../Reusable/LeftSidebar";
import WorkspaceList from "./WorkspaceList";
import WorkspaceDetails from "./WorkspaceDetails";
import ResponsesStat from "./ResponsesStat";
import AppbarContent from "./AppbarContent";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  Typography,
} from "@mui/material";
import { BrushOutlined, CableOutlined, NavigateNext } from "@mui/icons-material";

const Workspaces = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(false);

  const links = (
    <MenuList disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <CableOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="subtitle1">Integrations</Typography>
        </ListItemText>
        <NavigateNext />
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <BrushOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="subtitle1">Branding</Typography>
        </ListItemText>
        <NavigateNext />
      </ListItemButton>
    </MenuList>
  );
  return (
    <>
      <Appbar>
        <AppbarContent />
      </Appbar>
      <LeftSidebar open={leftSidebarOpen} onChange={(open) => setLeftSidebarOpen(open)}>
        <WorkspaceList />
        <Divider />
        <ResponsesStat />
        <Divider />
        {links}
      </LeftSidebar>
      <WorkspaceDetails
        leftSidebarOpen={leftSidebarOpen}
        toggleSidebarState={() => setLeftSidebarOpen((prev) => !prev)}
      />
    </>
  );
};

export default Workspaces;
