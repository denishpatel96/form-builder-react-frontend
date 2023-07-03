import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Toolbar,
  AppBar,
  Typography,
  Avatar,
  Divider,
  Tooltip,
  ListSubheader,
} from "@mui/material";
import React from "react";
import Logo from "../Reusable/Logo";
import { CookieStorage } from "../../helpers/cookieStorage";
import { useLogoutMutation } from "../../store/features/authApi";
import { HelpCenterOutlined, LogoutOutlined, SettingsOutlined } from "@mui/icons-material";
import { ROUTE_HOME } from "../../constants";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import MenuPopover from "../Reusable/MenuPopover";
import { User } from "../../store/features/userApi";

const Appbar = ({ user }: { user: User }) => {
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [open, setOpen] = React.useState<boolean>(false);

  const userName = `${user.firstName} ${user.lastName}`;
  const initials = `${userName.split(" ")[0][0]}${userName.split(" ")[1][0]}`;
  const userEmail = user.email;

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    const { rT, idT } = CookieStorage.getAll();
    if (rT && idT) await logout({ token: rT, idToken: idT });
    // remove from cookie
    CookieStorage.clear();
    // go to home page
    navigate(ROUTE_HOME);
  };

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        color: (theme) => theme.palette.text.primary,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip
          title={
            <Stack>
              <Typography variant="subtitle1">{userName}</Typography>
              <Typography variant="caption">{userEmail}</Typography>
            </Stack>
          }
        >
          <Avatar
            sx={{ backgroundColor: (theme) => theme.palette.secondary.light }}
            ref={anchorRef}
            component={"div"}
            onClick={handleOpen}
          >
            {initials}
          </Avatar>
        </Tooltip>
        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
          sx={{ width: 250 }}
        >
          <Stack direction={"row"} spacing={1} p={2}>
            <Avatar sx={{ backgroundColor: (theme) => theme.palette.secondary.light }}>
              {initials}
            </Avatar>
            <Stack>
              <Typography variant="subtitle1">{userName}</Typography>
              <Typography variant="caption">{userEmail}</Typography>
            </Stack>
          </Stack>
          <Divider />
          <ListSubheader>
            <Typography variant="overline">ACCOUNT</Typography>
          </ListSubheader>
          <MenuItem
            onClick={() => {
              // TODO : do something
            }}
          >
            <ListItemIcon>
              <SettingsOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>

          <Divider />
          <ListSubheader>
            <Typography variant="overline">RESOURCES</Typography>
          </ListSubheader>
          <MenuItem
            onClick={() => {
              // TODO : do something
            }}
          >
            <ListItemIcon>
              <HelpCenterOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Help Center</ListItemText>
          </MenuItem>

          <Divider />
          <MenuItem
            onClick={() => {
              handleLogout();
            }}
          >
            <ListItemIcon>
              <LogoutOutlined color="error" fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography color="error">Logout</Typography>
            </ListItemText>
          </MenuItem>
        </MenuPopover>
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}></Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
