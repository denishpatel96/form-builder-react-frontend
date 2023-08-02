import {
  Box,
  Typography,
  LinearProgress,
  Skeleton,
  Alert,
  Card,
  IconButton,
  CardContent,
  Collapse,
  TextField,
} from "@mui/material";
import React from "react";
import { Close, FilterList, Search } from "@mui/icons-material";
import { useGetWorkspacesQuery } from "../../store/features/api";
import { useNavigate, useParams } from "react-router-dom";
import { ANIMATION_SKELETON, ROUTE_WORKSPACE } from "../../constants";
import { useAppSelector } from "../../store/hooks";

const WorkspaceList = () => {
  const navigate = useNavigate();

  const username = useAppSelector((state) => state.auth.username);
  const { workspaceId: activeWorkspaceId } = useParams();
  const [showSearch, setShowSearch] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");

  const {
    isLoading: isWsLoading,
    isFetching: isWsFetching,
    isSuccess: isWsSuccess,
    isError: isWsError,
    data: workspaces,
    error: wsError,
  } = useGetWorkspacesQuery(username, { skip: !username });

  const filteredWorkspaces =
    workspaces?.filter((w) => w.name.toLowerCase().includes(searchText.toLowerCase())) || [];

  const gotoWorkspace = (id: string) => {
    navigate(ROUTE_WORKSPACE.replace(":username", username).replace(":workspaceId", id), {
      replace: true,
    });
  };

  let content;
  if (isWsLoading || (isWsFetching && !workspaces)) {
    content = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height="100%" width="100%" />
    );
  } else if (isWsSuccess && workspaces) {
    content = (
      <>
        <Card>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 2, justifyContent: "space-between" }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {!showSearch && <Typography>Workspaces ({workspaces.length})</Typography>}
              <Collapse in={showSearch}>
                <TextField
                  InputProps={{
                    startAdornment: <Search />,
                    endAdornment: (
                      <IconButton size="small" onClick={() => setSearchText("")}>
                        <Close />
                      </IconButton>
                    ),
                  }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value?.trim())}
                />
              </Collapse>
            </Box>
            {!showSearch && (
              <IconButton onClick={() => setShowSearch(true)}>
                <Search />
              </IconButton>
            )}
            <IconButton>
              <FilterList />
            </IconButton>
          </Box>
        </Card>
        <Box sx={{ overflow: "auto" }}>
          {isWsFetching && <LinearProgress />}

          {filteredWorkspaces.map((w, index) => {
            return (
              <Card
                sx={{
                  ...(activeWorkspaceId === w.id && {
                    backgroundColor: (theme) => theme.palette.background.default,
                  }),
                  height: 150,
                }}
                key={index}
                onClick={() => gotoWorkspace(w.id)}
              >
                <CardContent>
                  <Typography variant="subtitle1">{w.name}</Typography>
                  <Typography variant="body2" mt={1}>
                    Last edited {new Date(w.updatedAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
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
