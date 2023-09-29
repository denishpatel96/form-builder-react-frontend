import { LogoutOutlined, Person, SettingsOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ANIMATION_SKELETON, ROUTE_USER_SETTINGS, ROUTE_HOME } from "../../constants";
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
        <Box
          title={userName}
          sx={{
            cursor: "pointer",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleOpen}
          ref={anchorRef}
        >
          <Avatar
            variant="circular"
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              ":hover": {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
            src={getGravatarURL(user.email)}
          >
            <Person color="secondary" />
          </Avatar>
        </Box>
        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
          sx={{ width: { xs: "100%", sm: 250 }, maxWidth: 250 }}
        >
          <Stack>
            <Stack direction={"row"} spacing={2} p={2}>
              <Avatar
                variant="circular"
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                }}
                src={getGravatarURL(user.email)}
              >
                <Person />
              </Avatar>
              <Stack>
                <Typography variant="subtitle1">{userName}</Typography>
                <Typography variant="caption">{userEmail}</Typography>
              </Stack>
            </Stack>
            <Divider />
            <MenuItem
              onClick={() => {
                navigate(ROUTE_USER_SETTINGS);
              }}
            >
              <ListItemIcon>
                <SettingsOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Account Settings</ListItemText>
            </MenuItem>
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
