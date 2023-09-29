import React from "react";
import Appbar from "../Reusable/Appbar";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";
import { useNavigate, useParams } from "react-router-dom";
import { useGetWorkspacesQuery } from "../../store/features/api";
import { ANIMATION_SKELETON, ROUTE_WORKSPACE, ROUTE_WORKSPACES } from "../../constants";
import {
  Add,
  BookmarkBorderOutlined,
  Close,
  FilterList,
  Menu,
  PeopleOutlined,
  PersonAdd,
  PersonOutlined,
  Search,
} from "@mui/icons-material";
import WorkspaceMenu from "./WorkspaceMenu";
import { cloneDeep } from "lodash";
import BookmarkWorkspaceButton from "./BookmarkWorkspaceButton";
import LeftSidebar from "../Reusable/LeftSidebar";
import OrganizationMenu from "../Reusable/OrganizationMenu";
import UserMenu from "../Reusable/UserMenu";
import MHidden from "../Reusable/MHidden";
import PendingActionsDialog from "./PendingActionsDialog";

const Workspaces = () => {
  const navigate = useNavigate();
  const { orgId, workspaceId } = useParams() as { orgId: string; workspaceId?: string };
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(false);
  const [showSearch, setShowSearch] = React.useState<boolean>(false);
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [showBookmarked, setShowBookmarked] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<"updatedAt" | "name">("updatedAt");
  const {
    isLoading: isWsLoading,
    isFetching: isWsFetching,
    isSuccess: isWsSuccess,
    isError: isWsError,
    data: workspaces,
    error: wsError,
  } = useGetWorkspacesQuery(orgId, { skip: !orgId });

  const gotoWorkspace = (id?: string) => {
    if (id) {
      navigate(ROUTE_WORKSPACE.replace(":orgId", orgId).replace(":workspaceId", id), {
        replace: true,
      });
    } else {
      navigate(ROUTE_WORKSPACES.replace(":orgId", orgId));
    }
  };

  let workspaceSearchAndFilters, workspaceList, workspaceDetails;
  if (isWsLoading || (isWsFetching && !workspaces)) {
    workspaceSearchAndFilters = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height={60} width="100%" />
    );
    workspaceList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
      <ListItem
        key={item}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ pr: 1 }}>
          <Skeleton variant="circular" animation={ANIMATION_SKELETON} width={20} height={20} />
        </Box>
        <ListItemText
          sx={{ pl: 2 }}
          primary={
            <Skeleton
              key={item}
              variant="text"
              animation={ANIMATION_SKELETON}
              sx={{ my: 1 }}
              width={`${Math.floor(Math.random() * 71) + 30}%`}
            />
          }
          secondary={
            <Skeleton
              key={item}
              variant="text"
              animation={ANIMATION_SKELETON}
              sx={{ my: 1 }}
              width="40%"
              height={10}
            />
          }
        />
      </ListItem>
    ));
    workspaceDetails = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height="100%" width="100%" />
    );
  } else if (isWsSuccess && workspaces) {
    const sortedWorkspaces = cloneDeep(workspaces)?.sort((a, b) =>
      sortBy === "updatedAt" ? (a[sortBy] < b[sortBy] ? 1 : -1) : a[sortBy] > b[sortBy] ? 1 : -1
    );

    const filteredWorkspaces =
      sortedWorkspaces?.filter(
        (w) =>
          (showBookmarked ? w.bookmarked : true) &&
          w.name.toLowerCase().includes(searchText.toLowerCase())
      ) || [];

    const filtersApplied = showBookmarked || sortBy !== "updatedAt";
    const handleClearFilters = () => {
      setShowBookmarked(false);
      setSortBy("updatedAt");
      setShowFilters(false);
    };

    workspaceSearchAndFilters = (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            height: 60,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {showSearch ? (
              <TextField
                autoFocus
                fullWidth
                onBlur={(e) => {
                  if (!searchText) {
                    setShowSearch(false);
                  } else {
                    e?.currentTarget.focus();
                  }
                }}
                placeholder="Find workspaces"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchText && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchText("")}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            ) : (
              <Typography pl={2}>Workspaces ({workspaces.length})</Typography>
            )}
          </Box>

          {!showSearch && (
            <IconButton onClick={() => setShowSearch(true)}>
              <Search />
            </IconButton>
          )}
          <IconButton
            sx={{
              ...(showFilters && { backgroundColor: (theme) => theme.palette.action.selected }),
            }}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <FilterList />
          </IconButton>
          <CreateWorkspaceDialog
            button={
              <IconButton>
                <Add />
              </IconButton>
            }
          />
        </Box>

        {filtersApplied && (
          <Box sx={{ p: 1, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Chip label="filters applied" onDelete={handleClearFilters} />
          </Box>
        )}

        {showFilters && (
          <Grid
            container
            p={2}
            spacing={2}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Grid item xs={12}>
              <Stack>
                <Typography variant="caption">Show</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showBookmarked}
                      onChange={(e) => setShowBookmarked(e.target.checked)}
                      name="showBookmarked"
                    />
                  }
                  label="Bookmarked"
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack>
                <Typography variant="caption">Sort by</Typography>
                <RadioGroup
                  name="workspace-filter-sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "updatedAt" | "name")}
                >
                  <FormControlLabel
                    value="updatedAt"
                    control={<Radio />}
                    label="Recently Updated"
                  />
                  <FormControlLabel value="name" control={<Radio />} label="Name" />
                </RadioGroup>
              </Stack>
            </Grid>
          </Grid>
        )}
      </>
    );
    workspaceList = (
      <>
        {isWsFetching && <LinearProgress />}

        {filteredWorkspaces.length === 0 && (
          <Box p={2}>
            {workspaces.length === 0 ? (
              <Stack alignItems={"center"}>
                <Typography variant="subtitle2" textAlign={"center"}>
                  No workspaces found.
                </Typography>
                <Typography mb={2} variant="body2" textAlign={"center"}>
                  Workspaces will appear here once created.
                </Typography>
                <CreateWorkspaceDialog
                  button={<Button startIcon={<Add />}>Create workspace</Button>}
                />
              </Stack>
            ) : (
              <>
                <Typography variant="subtitle2" textAlign={"center"}>
                  No matching workspaces found.
                </Typography>
                <Typography variant="body2" textAlign={"center"}>
                  Please try alternate words or remove filters.
                </Typography>
              </>
            )}
          </Box>
        )}
        {filteredWorkspaces.map((w, index) => {
          return (
            <ListItem
              sx={{
                ...(workspaceId === w.workspaceId && {
                  backgroundColor: (theme) =>
                    isWsLoading
                      ? theme.palette.action.disabledBackground
                      : theme.palette.background.default,
                }),
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                ":hover": {
                  backgroundColor: (theme) =>
                    isWsLoading
                      ? theme.palette.action.disabledBackground
                      : theme.palette.action.hover,
                  cursor: "pointer",
                },
              }}
              key={index}
              onClick={() => {
                if (!isWsFetching) gotoWorkspace(w.workspaceId);
              }}
            >
              <Box sx={{ pr: 1 }}>
                <Stack>
                  {w.memberCount === 1 ? (
                    <PersonOutlined fontSize={"small"} />
                  ) : (
                    <PeopleOutlined fontSize={"small"} />
                  )}
                  {w.bookmarked && <BookmarkBorderOutlined fontSize={"small"} />}
                </Stack>
              </Box>
              <ListItemText
                sx={{ pl: 2, borderLeft: (theme) => `1px solid ${theme.palette.divider}` }}
                primary={<Typography variant="subtitle1">{w.name}</Typography>}
                secondary={
                  <Typography variant="caption">
                    {w.memberCount} {w.memberCount === 1 ? "member" : "members"}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </>
    );

    if (workspaces.length === 0) {
      workspaceDetails = (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 3,
          }}
        >
          <Stack spacing={1}>
            <Typography textAlign={"center"} variant="h4">
              Welcome and let's get you started.
            </Typography>
            <Typography textAlign={"center"}>
              Workspace organizes forms and restrict access to selected members.
            </Typography>
            <Typography textAlign={"center"}>
              Get started by creating your first workspace.
            </Typography>
          </Stack>
          <CreateWorkspaceDialog
            button={
              <Button variant="contained" startIcon={<Add />}>
                Create workspace
              </Button>
            }
          />
        </Box>
      );
    } else {
      const activeWorkspace = workspaces.find((w) => w.workspaceId === workspaceId);
      if (activeWorkspace) {
        workspaceDetails = (
          <Box>
            <Box sx={{ pl: 4, height: 100 }}>
              <Typography variant="h4" py={2}>
                {activeWorkspace.name}
              </Typography>
              <Typography component={"span"} variant="body2">
                Created on{" "}
              </Typography>
              <Tooltip title={new Date(activeWorkspace.createdAt).toLocaleTimeString()}>
                <Typography variant="body2" component={"span"}>
                  {new Date(activeWorkspace.createdAt).toLocaleDateString()}
                </Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
              }}
            >
              <BookmarkWorkspaceButton workspace={activeWorkspace} />
              <WorkspaceMenu workspace={activeWorkspace} />
              <Button variant="contained" startIcon={<PersonAdd />}>
                Share
              </Button>
            </Box>
          </Box>
        );
      }
    }
  } else if (isWsError) {
    console.log("Error fetching user :", wsError);
    workspaceList = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  React.useEffect(() => {
    if (
      isWsSuccess &&
      workspaces.length > 0 &&
      (!workspaceId || workspaces?.findIndex((w) => w.workspaceId === workspaceId) === -1)
    ) {
      gotoWorkspace(workspaces[0].workspaceId);
    }
  }, [isWsSuccess, workspaces]);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <LeftSidebar open={leftSidebarOpen} onChange={(isOpen) => setLeftSidebarOpen(isOpen)}>
        <Box>{workspaceSearchAndFilters}</Box>
        <Box sx={{ width: "100%", overflow: "auto" }}>{workspaceList}</Box>
      </LeftSidebar>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Appbar>
          <MHidden width="lgUp">
            <IconButton onClick={() => setLeftSidebarOpen((prev) => !prev)}>
              <Menu />
            </IconButton>
          </MHidden>
          <OrganizationMenu />
          <Box sx={{ flexGrow: 1 }} />
          <PendingActionsDialog />
          <UserMenu />
        </Appbar>

        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            background: (theme) => theme.palette.background.default,
          }}
        >
          {workspaceDetails}
        </Box>
      </Box>
    </Box>
  );
};

export default Workspaces;
