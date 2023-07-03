import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuList,
  Stack,
  Typography,
  Divider,
  ListItemButton,
  LinearProgress,
  Button,
  Collapse,
  Drawer,
  IconButton,
} from "@mui/material";
import React from "react";
import {
  Add,
  BrushOutlined,
  CableOutlined,
  ExpandLess,
  ExpandMore,
  MenuOpenOutlined,
  NavigateNext,
  People,
  Person,
  Search,
} from "@mui/icons-material";
import _ from "lodash";
import MHidden from "../Reusable/MHidden";
import { APP_BAR_HEIGHT, DRAWER_WIDTH_TABLET } from "../../constants";
import Logo from "../Reusable/Logo";
import { User, Workspace } from "../../store/features/userApi";

export interface LeftSidebarProps {
  open: boolean;
  onChange: (open: boolean) => void;
  user: User;
  workspaces: Workspace[];
  activeWorkspaceId: string;
  setActiveWorkspaceId: (id: string) => void;
}

const LeftSidebar = ({
  open,
  onChange,
  user,
  workspaces,
  activeWorkspaceId,
  setActiveWorkspaceId,
}: LeftSidebarProps) => {
  const userName = `${user.firstName} ${user.lastName}`;
  const privateWorkspaces = workspaces.filter((w) => w.memberCount === 0);
  const sharedWorkspaces = workspaces.filter((w) => w.memberCount > 0);
  // calculate response in last billing cycle(month)
  const responsesCollected = user.responseCount;
  // Monthly response limit
  const responseLimit = 100;

  const [expandedPersonal, setExpandedPersonal] = React.useState<boolean>(true);
  const [expandedShared, setExpandedShared] = React.useState<boolean>(false);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <MHidden width="lgUp">
        <Box
          sx={{
            height: APP_BAR_HEIGHT,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Logo />
          <IconButton onClick={() => onChange(false)}>
            <MenuOpenOutlined />
          </IconButton>
        </Box>
      </MHidden>
      <Box sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
        <Stack spacing={2} p={2}>
          <Button fullWidth startIcon={<Search />} variant="outlined">
            <Typography variant="body2">Search Workspace or form</Typography>
          </Button>
          <Button fullWidth startIcon={<Add />} variant="contained">
            Create Workspace
          </Button>
        </Stack>
        <ListItemButton onClick={() => setExpandedPersonal((prev) => !prev)}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="subtitle1">Private</Typography>
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
                    borderRight: (theme) => `4px solid ${theme.palette.secondary.main}`,
                  }),
                }}
                key={index}
                onClick={() => setActiveWorkspaceId(w.id)}
              >
                <ListItemText>
                  <Typography>{w.name}</Typography>
                </ListItemText>
              </ListItemButton>
            );
          })}
        </Collapse>
        {sharedWorkspaces.length > 0 && (
          <>
            <ListItemButton onClick={() => setExpandedShared((prev) => !prev)}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="subtitle1">Shared</Typography>
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
                        borderRight: (theme) => `4px solid ${theme.palette.secondary.main}`,
                      }),
                    }}
                    key={index}
                    onClick={() => setActiveWorkspaceId(w.id)}
                  >
                    <ListItemText>
                      <Typography>{w.name}</Typography>
                    </ListItemText>
                  </ListItemButton>
                );
              })}
            </Collapse>
          </>
        )}
      </Box>
      <Divider />
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography variant="subtitle1" py={{ xs: 1, sm: 3 }}>
          <strong>{userName}'s</strong> account
        </Typography>
        <Typography pb={{ xs: 1, sm: 2 }}>Responses Collected</Typography>
        <LinearProgress variant="determinate" value={100 * (responsesCollected / responseLimit)} />
        <Typography textAlign={"right"}>
          <strong>{responsesCollected}</strong> / {responseLimit}
        </Typography>
        <Button>Increase response limit</Button>
      </Box>
      <Divider />
      <MenuList disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <CableOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="subtitle1">Integrations</Typography>
          </ListItemText>
          <NavigateNext />
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <BrushOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="subtitle1">Branding</Typography>
          </ListItemText>
          <NavigateNext />
        </ListItemButton>
      </MenuList>
    </Box>
  );

  return (
    <>
      <MHidden width="lgDown">
        <Drawer
          variant={"permanent"}
          anchor={"left"}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH_TABLET,
              overflow: "hidden",
              position: "relative",
            },
          }}
        >
          {content}
        </Drawer>
      </MHidden>
      <MHidden width="lgUp">
        <Drawer
          open={open}
          onClose={() => onChange(false)}
          anchor={"left"}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH_TABLET,
              overflow: "hidden",
            },
          }}
        >
          {content}
        </Drawer>
      </MHidden>
    </>
  );
};

export default LeftSidebar;
