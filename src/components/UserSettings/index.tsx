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
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_ACCOUNT_SETTINGS, ROUTE_ACCOUNT_SETTINGS_COMMUNICATIONS } from "../../constants";
import CommunicationsSettings from "./CommunicationsSettings";

const UserSettings = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const links = (
    <MenuList disablePadding>
      <ListItemButton
        sx={{
          ...(pathname === ROUTE_ACCOUNT_SETTINGS && {
            backgroundColor: (theme) => theme.palette.background.default,
          }),
        }}
        onClick={() => navigate(ROUTE_ACCOUNT_SETTINGS)}
      >
        <ListItemIcon>
          <SettingsOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="subtitle1">General Setttings</Typography>
        </ListItemText>
        <NavigateNext />
      </ListItemButton>
      <Divider />
      <ListItemButton
        sx={{
          ...(pathname === ROUTE_ACCOUNT_SETTINGS_COMMUNICATIONS && {
            backgroundColor: (theme) => theme.palette.background.default,
          }),
        }}
        onClick={() => navigate(ROUTE_ACCOUNT_SETTINGS_COMMUNICATIONS)}
      >
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
      {pathname === ROUTE_ACCOUNT_SETTINGS_COMMUNICATIONS ? (
        <CommunicationsSettings
          leftSidebarOpen={leftSidebarOpen}
          toggleSidebarState={() => setLeftSidebarOpen((prev) => !prev)}
        />
      ) : (
        <GeneralSettings
          leftSidebarOpen={leftSidebarOpen}
          toggleSidebarState={() => setLeftSidebarOpen((prev) => !prev)}
        />
      )}
    </>
  );
};

export default UserSettings;
