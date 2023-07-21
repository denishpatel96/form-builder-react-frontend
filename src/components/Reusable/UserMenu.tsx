import {
  AccountCircle,
  HelpCenterOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ANIMATION_SKELETON, ROUTE_ACCOUNT_SETTINGS, ROUTE_HOME } from "../../constants";
import { CookieStorage } from "../../helpers/cookieStorage";
import { getGravatarURL } from "../../helpers/functions";
import api, { useGetUserQuery, useLogoutMutation } from "../../store/features/api";
import { resetAuthState } from "../../store/features/authSlice";
import { resetFormState } from "../../store/features/formSlice";
import { resetSignalState } from "../../store/features/signalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import MenuPopover from "./MenuPopover";

const UserMenu = () => {
  const anchorRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [open, setOpen] = React.useState<boolean>(false);
  const username = useAppSelector((state) => state.auth.username);
  const {
    //isLoading: isUserLoading,
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
    data: user,
    error: userError,
  } = useGetUserQuery(username, { skip: !username });

  const handleLogout = () => {
    const { rT, idT } = CookieStorage.getAll();
    if (rT && idT) logout({ token: rT });
    // clear api cache
    dispatch(api.util.resetApiState());
    dispatch(resetFormState());
    dispatch(resetAuthState());
    dispatch(resetSignalState());
    // remove from cookie
    CookieStorage.clear();
    // go to home page
    navigate(ROUTE_HOME);
  };

  let content;

  if (isUserFetching) {
    content = <Skeleton variant="circular" animation={ANIMATION_SKELETON} height={40} width={40} />;
  } else if (isUserSuccess && user) {
    const userName = `${user.firstName} ${user.lastName}`;
    // const initials = `${userName.split(" ")[0][0]}${userName.split(" ")[1][0]}`;
    const userEmail = user.email;

    const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    content = (
      <>
        <Tooltip
          title={
            <Stack>
              <Typography variant="subtitle1">{userName}</Typography>
              <Typography variant="caption">{userEmail}</Typography>
            </Stack>
          }
        >
          <Avatar
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: (theme) => (open ? theme.shadows[5] : theme.shadows[1]),
              cursor: "pointer",
            }}
            ref={anchorRef}
            component={"div"}
            onClick={handleOpen}
            src={getGravatarURL(user.email)}
          >
            <AccountCircle color="secondary" />
          </Avatar>
        </Tooltip>
        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
          sx={{ width: { xs: "100%", sm: 250 }, maxWidth: 250 }}
        >
          <Stack>
            <Stack direction={"row"} spacing={2} p={2}>
              <Avatar
                sx={{ backgroundColor: (theme) => theme.palette.secondary.light }}
                src={getGravatarURL(user.email)}
              >
                <AccountCircle />
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
                navigate(ROUTE_ACCOUNT_SETTINGS);
              }}
            >
              <ListItemIcon>
                <SettingsOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Manage Account</ListItemText>
            </MenuItem>
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
          </Stack>
        </MenuPopover>
      </>
    );
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
    handleLogout();
  }

  return <>{content}</>;
};

export default UserMenu;
