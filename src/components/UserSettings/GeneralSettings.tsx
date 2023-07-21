import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { AccountCircle, MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import MHidden from "../Reusable/MHidden";
import { useGetUserQuery } from "../../store/features/api";
import { useAppSelector } from "../../store/hooks";
import { ANIMATION_SKELETON } from "../../constants";
import ChangeNameDialog from "./ChangeNameDialog";
import { getGravatarURL } from "../../helpers/functions";
import ChangeEmailDialog from "./ChangeEmailDialog";

interface MainProps {
  toggleSidebarState: () => void;
  leftSidebarOpen: boolean;
}

const GeneralSettings = ({ leftSidebarOpen, toggleSidebarState }: MainProps) => {
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
    content = (
      <Box
        sx={{
          background: (theme) => theme.palette.background.default,
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Container>
          <Box sx={{ p: { md: 4 }, display: "flex", alignItems: "center", height: 50 }}>
            <MHidden width="lgUp">
              <IconButton onClick={toggleSidebarState}>
                {leftSidebarOpen ? <MenuOpenOutlined /> : <MenuOutlined />}
              </IconButton>
            </MHidden>
            <Typography variant="h5">General Settings</Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          {isUserFetching && <LinearProgress />}
          <Card sx={{ m: { md: 4 } }}>
            <CardContent>
              <Stack spacing={4}>
                <Stack direction={"row"} spacing={2}>
                  <Avatar
                    sx={{ backgroundColor: (theme) => theme.palette.secondary.light }}
                    src={getGravatarURL(user.email)}
                  >
                    <AccountCircle />
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
                  <ChangeNameDialog />
                  <Button
                    sx={{ ml: 2 }}
                    variant="contained"
                    onClick={() => window.open("https://www.gravatar.com", "_blank")}
                  >
                    Change Gravatar
                  </Button>
                </Box>
                <Divider />
                <Typography variant="subtitle1">LOGIN DETAILS</Typography>
                <Typography>Your email : {user.email}</Typography>
                <Box>
                  <ChangeEmailDialog />
                  <Button sx={{ ml: 2 }} variant="contained">
                    Change Password
                  </Button>
                </Box>
                <Divider />
                <Typography variant="subtitle1">DELETE ACCOUNT</Typography>
                <Typography>
                  If you delete your account, all the forms and collected responses will be removed
                  from the system permanently.
                </Typography>
                <Box>
                  <Button variant="contained" color="error">
                    Delete Account
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
    content = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  return <>{content}</>;
};

export default GeneralSettings;
