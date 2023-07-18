import {
  Box,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  ListItemButton,
  LinearProgress,
  Collapse,
  ListItemSecondaryAction,
  Skeleton,
  Alert,
} from "@mui/material";
import React from "react";
import { ExpandLess, ExpandMore, People, Person } from "@mui/icons-material";
import { useGetWorkspacesQuery } from "../../store/features/api";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";
import SearchDialog from "./SearchDialog";
import { useNavigate, useParams } from "react-router-dom";
import { ANIMATION_SKELETON, ROUTE_WORKSPACES } from "../../constants";
import { useAppSelector } from "../../store/hooks";

const WorkspaceList = () => {
  const navigate = useNavigate();

  const [expandedPersonal, setExpandedPersonal] = React.useState<boolean>(true);
  const [expandedShared, setExpandedShared] = React.useState<boolean>(false);

  const userId = useAppSelector((state) => state.auth.userId);
  const { workspaceId: activeWorkspaceId } = useParams();

  const {
    isLoading: isWsLoading,
    isFetching: isWsFetching,
    isSuccess: isWsSuccess,
    isError: isWsError,
    data: workspaces,
    error: wsError,
  } = useGetWorkspacesQuery(userId, { skip: !userId });

  const gotoWorkspace = (id: string) => {
    navigate(ROUTE_WORKSPACES.replace(":userId", userId).replace(":workspaceId", id), {
      replace: true,
    });
  };

  React.useEffect(() => {
    if (
      (!activeWorkspaceId || activeWorkspaceId === ":workspaceId") &&
      userId &&
      workspaces &&
      workspaces.length > 0
    ) {
      gotoWorkspace(workspaces[0].id);
    }
  }, [workspaces, navigate, userId]);

  let content;
  if (isWsLoading || (isWsFetching && !workspaces)) {
    content = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height="100%" width="100%" />
    );
  } else if (isWsSuccess && workspaces) {
    const privateWorkspaces = workspaces.filter((w) => w.memberCount === 0);
    const sharedWorkspaces = workspaces.filter((w) => w.memberCount > 0);
    content = (
      <>
        <Stack spacing={2} p={2}>
          <CreateWorkspaceDialog />
          <SearchDialog workspaces={workspaces} onSelect={(id) => gotoWorkspace(id)} />
        </Stack>
        {isWsFetching && <LinearProgress />}
        <Box sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
          <ListItemButton onClick={() => setExpandedPersonal((prev) => !prev)}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="subtitle1">Private ({privateWorkspaces.length})</Typography>
            </ListItemText>
            {expandedPersonal ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandedPersonal}>
            {privateWorkspaces.map((w, index) => {
              return (
                <ListItemButton
                  sx={{
                    ...(activeWorkspaceId === w.id && {
                      backgroundColor: (theme) => theme.palette.background.default,
                    }),
                  }}
                  disabled={isWsFetching}
                  key={index}
                  onClick={() => gotoWorkspace(w.id)}
                >
                  <ListItemText>
                    <Typography variant={activeWorkspaceId === w.id ? "subtitle2" : "body2"}>
                      {w.name}
                    </Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Typography variant={activeWorkspaceId === w.id ? "subtitle2" : "body2"}>
                      {w.formCount}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
              );
            })}
          </Collapse>
          <>
            <ListItemButton onClick={() => setExpandedShared((prev) => !prev)}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="subtitle1">Shared ({sharedWorkspaces.length})</Typography>
              </ListItemText>

              {expandedShared ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={expandedPersonal}>
              {sharedWorkspaces.map((w, index) => {
                return (
                  <ListItemButton
                    sx={{
                      ...(activeWorkspaceId === w.id && {
                        backgroundColor: (theme) => theme.palette.background.default,
                      }),
                    }}
                    key={index}
                    onClick={() => gotoWorkspace(w.id)}
                  >
                    <ListItemText>
                      <Typography>{w.name}</Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>{w.formCount}</ListItemSecondaryAction>
                  </ListItemButton>
                );
              })}
            </Collapse>
          </>
        </Box>
      </>
    );
  } else if (isWsError) {
    console.log("Error fetching user :", wsError);
    content = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  return <>{content}</>;
};

export default WorkspaceList;
