import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ANIMATION_SKELETON, HIDE_TOAST_DURATION } from "../../constants";
import {
  useGetOrgMemberInvitationsQuery,
  useGetUserQuery,
  useRespondToOrgMemberInvitationMutation,
} from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Close, PendingActionsOutlined } from "@mui/icons-material";
import { hideToast, showToast } from "../../store/features/signalSlice";
import DeclineInvitationDialog from "./DeclineInvitationDialog";

const PendingActionsDialog = ({
  onClose,
  button,
}: {
  onClose?: () => void;
  button?: React.ReactNode;
  disabled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
  const {
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    data: user,
    isError: isUserError,
    error: userError,
  } = useGetUserQuery(username, { skip: !username });

  const {
    isFetching: isInvitesFetching,
    isSuccess: isInvitesSuccess,
    data: invitations,
    isError: isInvitesError,
    error: invitesError,
  } = useGetOrgMemberInvitationsQuery({ email: user?.email }, { skip: !user });

  const [respondToOrgMemberInvitation, { isLoading, reset }] =
    useRespondToOrgMemberInvitationMutation();

  const handleResponse = async (orgId: string, email: string, accepted: boolean) => {
    if (isLoading) return;
    const toastId = new Date().valueOf();
    try {
      await respondToOrgMemberInvitation({
        orgId,
        accepted,
        email,
      }).unwrap();
      dispatch(
        showToast({
          id: toastId,
          message: "Invitation response submitted successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error submitting invitation response: ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error submitting invitation response",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  let invitationsList, invitationsHeader;
  if ((isUserFetching && !user) || (isInvitesFetching && !invitations)) {
    invitationsHeader = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height={60} width="100%" />
    );
    invitationsList = [1, 2, 3, 4].map((item) => (
      <ListItem
        key={item}
        secondaryAction={
          <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height={30} width={100} />
        }
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <ListItemText
          sx={{ pl: 2 }}
          primary={
            <Skeleton
              key={item}
              variant="text"
              animation={ANIMATION_SKELETON}
              sx={{ my: 1 }}
              width={`${Math.floor(Math.random() * 61) + 30}%`}
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
  } else if (isUserSuccess && user) {
    if (isInvitesSuccess && invitations) {
      invitationsHeader = (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            height: 60,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography pl={2}>Invitations ({invitations ? invitations.length : 0})</Typography>
          </Box>
        </Box>
      );
      invitationsList = invitations.map((m, index) => {
        return (
          <Stack
            spacing={1}
            key={index}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, p: 2 }}
          >
            <Typography variant="caption">{new Date(m.createdAt).toLocaleString()}</Typography>
            <Typography>
              <strong>
                {m.inviter.firstName} {m.inviter.lastName}
              </strong>{" "}
              invited you to collaborate as <strong>{m.role}</strong> in the{" "}
              <strong>{m.inviter.orgName}</strong> organization.
            </Typography>
            <Typography variant="caption">
              <em>
                please contact <strong>{m.inviter.email}</strong> in case of queries.
              </em>
            </Typography>
            {isLoading ? (
              <Box py={1}>
                <LinearProgress />
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <DeclineInvitationDialog
                  onSuccess={() => handleResponse(m.orgId, m.email, false)}
                />
                <Button onClick={() => handleResponse(m.orgId, m.email, true)}>Accept</Button>
              </Box>
            )}
          </Stack>
        );
      });
    } else if (isInvitesError) {
      console.log("Error fetching invitations :", invitesError);
    }
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = () => {
    if (!isUserFetching) {
      if (onClose) onClose();
      setOpen(false);
    }
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        {button || (
          <IconButton
            title="Pending Actions"
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              ":hover": {
                backgroundColor: (theme) => theme.palette.action.hover,
                cursor: "pointer",
              },
            }}
          >
            <Badge
              color="secondary"
              invisible={!invitations || invitations.length === 0}
              badgeContent={invitations && invitations?.length}
            >
              <PendingActionsOutlined color="secondary" />
            </Badge>
          </IconButton>
        )}
      </Box>
      <Dialog
        maxWidth="md"
        PaperProps={{ sx: { minHeight: "70vh" } }}
        fullWidth
        open={open}
        onClose={handleClose}
        disableRestoreFocus
      >
        <DialogTitle>
          <Stack direction={"row"}>
            <Typography variant="h5" mr="auto">
              Pending Actions
            </Typography>
            <IconButton title="Close" onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            {invitationsHeader}
            <Box>{invitationsList}</Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingActionsDialog;
