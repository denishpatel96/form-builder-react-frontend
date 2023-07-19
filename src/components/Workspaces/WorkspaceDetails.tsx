import {
  Alert,
  Box,
  Container,
  IconButton,
  LinearProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import MHidden from "../Reusable/MHidden";
import WorkspaceMenu from "./WorkspaceMenu";
import { useGetWorkspacesQuery } from "../../store/features/api";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { ANIMATION_SKELETON } from "../../constants";

interface MainProps {
  toggleSidebarState: () => void;
  leftSidebarOpen: boolean;
}

const WorkspaceDetails = ({ leftSidebarOpen, toggleSidebarState }: MainProps) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const userId = useAppSelector((state) => state.auth.userId);
  const { workspaceId: activeWorkspaceId } = useParams();
  const {
    //isLoading: isWsLoading,
    isFetching: isWsFetching,
    isSuccess: isWsSuccess,
    isError: isWsError,
    data: wsData,
    error: wsError,
  } = useGetWorkspacesQuery(userId, { skip: !userId });

  let content;

  if (isWsFetching && !wsData) {
    content = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height="100%" width={"100%"} />
    );
  } else if (isWsSuccess && wsData) {
    const activeWorkspace = wsData.find((w) => w.id === activeWorkspaceId);

    content = activeWorkspace && (
      <Box
        sx={{
          background: (theme) => theme.palette.background.default,
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Container>
          <Box
            sx={{
              p: 4,
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              height: 50,
            }}
          >
            <MHidden width="lgUp">
              <IconButton onClick={toggleSidebarState}>
                {leftSidebarOpen ? <MenuOpenOutlined /> : <MenuOutlined />}
              </IconButton>
            </MHidden>
            <Typography variant="h5">{activeWorkspace.name}</Typography>
            <WorkspaceMenu
              workspace={activeWorkspace}
              open={menuOpen}
              onChange={(open) => setMenuOpen(open)}
            />
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          {isWsFetching && <LinearProgress />}
        </Container>
      </Box>
    );
  } else if (isWsError) {
    console.log("Error fetching user :", wsError);
    content = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  return <>{content}</>;
};

export default WorkspaceDetails;
