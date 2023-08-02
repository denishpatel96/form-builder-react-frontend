import {
  Business,
  GroupOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { ANIMATION_SKELETON } from "../../constants";
import { useGetUserQuery } from "../../store/features/api";
import { useAppSelector } from "../../store/hooks";
import MenuPopover from "../Reusable/MenuPopover";
import MHidden from "../Reusable/MHidden";

const OrganizationMenu = () => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const username = useAppSelector((state) => state.auth.username);
  const {
    //isLoading: isUserLoading,
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
    data: user,
    error: userError,
  } = useGetUserQuery(username, { skip: !username });

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
        <MHidden width="lgDown">
          <Skeleton variant="text" animation={ANIMATION_SKELETON} width={180} />
        </MHidden>
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
          ref={anchorRef}
          onClick={handleOpen}
          component={"div"}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Card
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
            <Avatar sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}>
              <Business />
            </Avatar>
          </Card>
          <MHidden width="lgDown">
            <Typography variant="subtitle1" color="secondary">
              {orgName}
            </Typography>
          </MHidden>
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
                // TODO : do something
              }}
            >
              <ListItemIcon>
                <SettingsOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                // TODO : do something
              }}
            >
              <ListItemIcon>
                <GroupOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Members</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                // TODO : do something
              }}
            >
              <ListItemIcon>
                <ReceiptLongOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Plan and Billing</ListItemText>
            </MenuItem>
            <Divider />
            <Stack direction={"row"} spacing={2} p={2}>
              <Avatar sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}>
                <Business />
              </Avatar>
              <Stack>
                <Typography variant="subtitle1">{orgName}</Typography>
                <Typography variant="caption">Gold plan</Typography>
              </Stack>
            </Stack>
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
