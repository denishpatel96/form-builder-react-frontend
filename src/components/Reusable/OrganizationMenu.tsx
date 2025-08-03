import {
  Business,
  GroupOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ANIMATION_SKELETON, ROUTE_ORGANIZATION_SETTINGS, ROUTE_WORKSPACES } from "../../constants";
import { useGetOrgsByUserQuery, useGetUserQuery } from "../../store/features/api";
import { useAppSelector } from "../../store/hooks";
import MenuPopover from "./MenuPopover";

const OrganizationMenu = () => {
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const { orgId } = useParams() as { orgId: string };
  const [open, setOpen] = React.useState<boolean>(false);
  const username = useAppSelector((state) => state.auth.username);
  const {
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
    data: user,
    error: userError,
  } = useGetUserQuery(username, { skip: !username });

  const { data: orgs, error: orgsError } = useGetOrgsByUserQuery(username, { skip: !username });

  if (orgsError) {
    console.log("Error fetching orgs by user :", orgsError);
  }

  let content;

  if (isUserFetching) {
    content = (
      <>
        <Skeleton
          variant="circular"
          animation={ANIMATION_SKELETON}
          height={40}
          width={40}
          sx={{ mr: 1 }}
        />
      </>
    );
  } else if (isUserSuccess && user) {
    const orgName = user.orgName;

    const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    content = (
      <>
        <Box
          title={orgName}
          sx={{
            cursor: "pointer",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleOpen}
          ref={anchorRef}
        >
          <Avatar
            variant="circular"
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              ":hover": {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <Business color="secondary" />
          </Avatar>
        </Box>
        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
          sx={{ width: { xs: "100%", sm: 250 }, maxWidth: 250 }}
        >
          <Stack>
            <MenuItem
              onClick={() => {
                navigate(ROUTE_ORGANIZATION_SETTINGS.replace(":orgId", orgId) + "?tab=admin");
                handleClose();
              }}
            >
              <ListItemIcon>
                <SettingsOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Admin Settings</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(ROUTE_ORGANIZATION_SETTINGS.replace(":orgId", orgId) + "?tab=members");
                handleClose();
              }}
            >
              <ListItemIcon>
                <GroupOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Members</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(
                  ROUTE_ORGANIZATION_SETTINGS.replace(":orgId", orgId) + "?tab=plan-and-billing"
                );
                handleClose();
              }}
            >
              <ListItemIcon>
                <ReceiptLongOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Plan and Billing</ListItemText>
            </MenuItem>
            <Divider />
            <Typography px={2} py={1} variant="overline">
              Organizations
            </Typography>
            <MenuItem
              onClick={() => {
                navigate(ROUTE_WORKSPACES.replace(":orgId", orgId));
                handleClose();
              }}
              selected={orgId === username}
            >
              <ListItemIcon>
                <Business fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                {orgName}
                <Typography variant="caption"> ( Owner )</Typography>
              </ListItemText>
            </MenuItem>

            {orgs?.map((org) => {
              return (
                <MenuItem
                  selected={orgId === org.orgId}
                  key={org.orgId}
                  onClick={() => {
                    navigate(ROUTE_WORKSPACES.replace(":orgId", org.orgId));
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <Business fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    {org.orgName}
                    <Typography variant="caption"> ( {org.role} )</Typography>
                  </ListItemText>
                </MenuItem>
              );
            })}
          </Stack>
        </MenuPopover>
      </>
    );
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
  }

  return <>{content}</>;
};

export default OrganizationMenu;
