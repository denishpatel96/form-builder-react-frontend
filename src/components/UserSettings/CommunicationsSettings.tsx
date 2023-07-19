import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import MHidden from "../Reusable/MHidden";
import { useGetUserQuery } from "../../store/features/api";
import { useAppSelector } from "../../store/hooks";
import { ANIMATION_SKELETON } from "../../constants";

interface MainProps {
  toggleSidebarState: () => void;
  leftSidebarOpen: boolean;
}

const CommunicationsSettings = ({ leftSidebarOpen, toggleSidebarState }: MainProps) => {
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
            <Typography variant="h5">Communications</Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <Card sx={{ m: { md: 4 } }}>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={11}>
                  <Typography variant="subtitle1">Product intro, tips, and inspiration</Typography>
                  <Typography variant="body2">
                    Help to make you create forms that convert.
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Switch />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="subtitle1">Company news</Typography>
                  <Typography variant="body2">
                    Updates about vTwinForms and our latest features
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Switch />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="subtitle1">Coupons and announcements</Typography>
                  <Typography variant="body2">Help to save your money.</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Switch />
                </Grid>
              </Grid>
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

export default CommunicationsSettings;
