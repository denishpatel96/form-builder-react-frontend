import React from "react";
import Appbar from "../Reusable/Appbar";
import LeftSidebar from "../Reusable/LeftSidebar";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  Typography,
} from "@mui/material";
import { ConnectWithoutContactOutlined, NavigateNext, SettingsOutlined } from "@mui/icons-material";
import AppbarContent from "./AppbarContent";
import GeneralSettings from "./GeneralSettings";

const UserSettings = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(false);

  const links = (
    <MenuList disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <SettingsOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="subtitle1">General Setttings</Typography>
        </ListItemText>
        <NavigateNext />
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <ConnectWithoutContactOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="subtitle1">Communications</Typography>
        </ListItemText>
        <NavigateNext />
      </ListItemButton>
      <Divider />
    </MenuList>
  );
  return (
    <>
      <Appbar>
        <AppbarContent />
      </Appbar>
      <LeftSidebar open={leftSidebarOpen} onChange={(open) => setLeftSidebarOpen(open)}>
        <Typography variant="h5" p={2}>
          Account
        </Typography>
        <Divider />
        {links}
      </LeftSidebar>
      <GeneralSettings
        leftSidebarOpen={leftSidebarOpen}
        toggleSidebarState={() => setLeftSidebarOpen((prev) => !prev)}
      />
    </>
  );
};

export default UserSettings;
