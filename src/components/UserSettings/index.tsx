import React from "react";
import Appbar from "../Reusable/Appbar";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { useGetUserQuery } from "../../store/features/api";
import { ANIMATION_SKELETON, ROUTE_WORKSPACES } from "../../constants";
import { getGravatarURL } from "../../helpers/functions";
import ChangeNameDialog from "./ChangeNameDialog";
import ChangeEmailDialog from "./ChangeEmailDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import OrganizationMenu from "../Reusable/OrganizationMenu";
import UserMenu from "../Reusable/UserMenu";

const UserSettings = () => {
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.auth.username);
  const {
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
    data: user,
    error: userError,
  } = useGetUserQuery(username, { skip: !username });
  let content;

  if (isUserFetching && !user) {
    content = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height="100%" width={"100%"} />
    );
  } else if (isUserSuccess && user) {
    const userName = `${user.firstName} ${user.lastName}`;
    const initials = `${userName.split(" ")[0][0]}${userName.split(" ")[1][0]}`;
    content = (
      <>
        {isUserFetching && <LinearProgress />}
        <Card>
          <CardContent>
            <Stack spacing={4}>
              <Stack direction={"row"} spacing={2}>
                <Avatar
                  variant="circular"
                  sx={{ backgroundColor: (theme) => theme.palette.secondary.light }}
                  src={getGravatarURL(user.email)}
                >
                  {initials}
                </Avatar>
                <Stack>
                  <Typography variant="subtitle1">{userName}</Typography>
                  <Typography variant="body2">
                    Joined on{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Stack>
              </Stack>
              <Box>
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  onClick={() => window.open("https://www.gravatar.com", "_blank")}
                >
                  Change Gravatar
                </Button>
                <ChangeNameDialog />
              </Box>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack>
              <Typography variant="subtitle1">Your email and password</Typography>
              <Typography variant="body2" pb={3} pt={1}>
                {user.email}
              </Typography>
              <Grid container sx={{ columnGap: 2 }}>
                <ChangeEmailDialog />
                <ChangePasswordDialog />
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </>
    );
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
    content = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Appbar>
        <Box sx={{ flexGrow: 1 }} />
        {/* <OrganizationMenu /> */}
        <UserMenu />
      </Appbar>
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <Stack width="100%">
          <Box sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(ROUTE_WORKSPACES.replace(":orgId", username))}
            >
              Workspaces
            </Button>
          </Box>
          <Box p={4}>
            <Typography variant="h4">Account Settings</Typography>
            <Typography mb={4} mt={1}>
              Change your name, image, email and password.
            </Typography>
          </Box>
          {content}
        </Stack>
      </Box>
    </Box>
  );
};

export default UserSettings;
