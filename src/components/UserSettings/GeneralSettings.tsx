import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { MenuOpenOutlined, MenuOutlined, PersonOutlined } from "@mui/icons-material";
import MHidden from "../Reusable/MHidden";
import { useGetUserQuery } from "../../store/features/api";
import { useAppSelector } from "../../store/hooks";
import { ANIMATION_SKELETON } from "../../constants";

interface MainProps {
  toggleSidebarState: () => void;
  leftSidebarOpen: boolean;
}

const GeneralSettings = ({ leftSidebarOpen, toggleSidebarState }: MainProps) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const {
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
    data: user,
    error: userError,
  } = useGetUserQuery(userId, { skip: !userId });
  let content;

  if (isUserFetching) {
    content = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height="100%" width={"100%"} />
    );
  } else if (isUserSuccess && user) {
    const userName = `${user.firstName} ${user.lastName}`;
    content = (
      <Container sx={{ background: (theme) => theme.palette.background.default }}>
        <Box sx={{ py: 2, display: "flex", alignItems: "center", height: 50 }}>
          <MHidden width="lgUp">
            <IconButton onClick={toggleSidebarState}>
              {leftSidebarOpen ? <MenuOpenOutlined /> : <MenuOutlined />}
            </IconButton>
          </MHidden>
          <Typography variant="h5">General Settings</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Card>
          <CardContent>
            <Stack direction={"row"} spacing={1} p={2}>
              <Avatar sx={{ backgroundColor: (theme) => theme.palette.secondary.light }}>
                <PersonOutlined />
              </Avatar>
              <Stack>
                <Typography variant="subtitle1">{userName}</Typography>
                <Typography variant="caption">{user.email}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
    content = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  return <>{content}</>;
};

export default GeneralSettings;
