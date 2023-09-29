import React from "react";
import Appbar from "../Reusable/Appbar";
import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { useGetUserQuery } from "../../store/features/api";
import { ANIMATION_SKELETON, ORG_MENU_ITEMS, ROUTE_WORKSPACES } from "../../constants";
import { getGravatarURL } from "../../helpers/functions";
import { ArrowBack, Business, Menu } from "@mui/icons-material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChangeOrgNameDialog from "./ChangeOrgNameDialog";
import OrganizationMembers from "./OrganizationMembers";
import LeftSidebar from "../Reusable/LeftSidebar";
import OrganizationMenu from "../Reusable/OrganizationMenu";
import UserMenu from "../Reusable/UserMenu";
import MHidden from "../Reusable/MHidden";

const OrganizationSettings = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(false);
  const { orgId } = useParams() as { orgId: string };
  const activeTab = searchParams.get("tab") || "admin";

  const username = useAppSelector((state) => state.auth.username);
  const {
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
    data: user,
    error: userError,
  } = useGetUserQuery(username, { skip: !username });

  let content, adminSettings, planAndBilling;

  if (isUserFetching && !user) {
    content = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height="100%" width={"100%"} />
    );
  } else if (isUserSuccess && user) {
    const orgName = user.orgName;
    adminSettings = (
      <>
        <Box p={2}>
          <Typography variant="h4">Admin Settings</Typography>
          <Typography mb={4} mt={1}>
            Change your organization name, forms domain and other settings.
          </Typography>
          <Stack pb={4} direction={"row"} display="flex" alignItems={"center"} spacing={2}>
            <Avatar
              variant="circular"
              sx={{ backgroundColor: (theme) => theme.palette.secondary.light }}
              src={getGravatarURL(user.email)}
            >
              <Business />
            </Avatar>
            <Typography variant="subtitle1">{orgName}</Typography>
          </Stack>
          <ChangeOrgNameDialog />
        </Box>
      </>
    );
    planAndBilling = (
      <>
        <Box p={2}>
          <Typography variant="h4">Plan and Billing</Typography>
          <Typography mb={4} mt={1}>
            View your plan details, change your plan or take a look at billings.
          </Typography>
        </Box>
      </>
    );
    content = (
      <>
        {isUserFetching && <LinearProgress />}
        {activeTab === "members" ? (
          <OrganizationMembers />
        ) : activeTab === "plan-and-billing" ? (
          planAndBilling
        ) : (
          adminSettings
        )}
      </>
    );
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
    content = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <LeftSidebar open={leftSidebarOpen} onChange={(isOpen) => setLeftSidebarOpen(isOpen)}>
        <List>
          {ORG_MENU_ITEMS.map((i, index) => {
            return (
              <ListItem
                key={index}
                sx={{
                  ...(activeTab === i.id && {
                    backgroundColor: (theme) => theme.palette.background.default,
                  }),
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  ":hover": {
                    backgroundColor: (theme) => theme.palette.action.hover,
                    cursor: "pointer",
                  },
                }}
                onClick={() => setSearchParams({ tab: i.id })}
              >
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText primary={i.label} />
              </ListItem>
            );
          })}
        </List>
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
          <UserMenu />
        </Appbar>

        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              width: "100%",
            }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(ROUTE_WORKSPACES.replace(":orgId", orgId))}
            >
              Workspaces
            </Button>
          </Box>
          {content}
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizationSettings;
