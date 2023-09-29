import { ArrowForwardOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import { HIDE_TOAST_DURATION, OrgMemberRole, ORG_MEMBER_ROLES } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import {
  useCreateOrgMemberInvitationMutation,
  useGetOrgMemberInvitationsQuery,
  useGetOrgMembersQuery,
} from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const CreateInvitationDialog = ({
  onSuccess,
  button,
}: {
  onSuccess?: () => void;
  button?: ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);

  const { data: invitations } = useGetOrgMemberInvitationsQuery(
    { orgId: username },
    { skip: !username }
  );

  const { data: orgMembers } = useGetOrgMembersQuery(username, { skip: !username });

  const [open, setOpen] = React.useState(false);
  const [createOrgMemberInvitation, { isLoading, reset }] = useCreateOrgMemberInvitationMutation();
  const [email, setEmail] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [role, setRole] = React.useState<OrgMemberRole>("Editor");
  const handleClickOpen = () => {
    setOpen(true);
    setEmail("");
    setEmailError("");
    setRole("Editor");
    reset();
  };

  const handleClose = () => {
    if (!isLoading) setOpen(false);
  };

  const handleSubmit = async () => {
    setEmailError("");
    if (isLoading) return;
    if (invitations && invitations?.find((i) => i.email === email)) {
      setEmailError(
        "Inviation is already sent to this email. Please find in existing invitations to update it."
      );
      return;
    }
    if (orgMembers && orgMembers?.find((m) => m.email === email)) {
      setEmailError("User with this email is already a member of this organization.");
      return;
    }

    const toastId = new Date().valueOf();
    try {
      await createOrgMemberInvitation({
        orgId: username,
        email,
        role,
      }).unwrap();
      if (onSuccess) onSuccess();
      dispatch(
        showToast({
          id: toastId,
          message: "Organization member invited successfully",
          severity: "success",
        })
      );
      handleClose();
    } catch (error) {
      console.log("Error inviting organization member : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error inviting organization member",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
  };

  return (
    <Box>
      <Box component="span" sx={{ width: "auto" }} onClick={handleClickOpen}>
        {button || <Button variant="contained">Invite Member</Button>}
      </Box>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>{"Invite an organization member"}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} py={2}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                label="Email"
                fullWidth
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                id="member-role"
                select
                label="Select role"
                SelectProps={{ native: false, renderValue: (value) => value as string }}
                value={role}
                onChange={(e) => setRole(e.target.value as OrgMemberRole)}
              >
                {ORG_MEMBER_ROLES.map((option) => (
                  <MenuItem key={option.label} value={option.label}>
                    <Stack>
                      <Typography>{option.label}</Typography>
                      <Typography variant="caption">{option.description}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button size="large" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              size="large"
              loading={isLoading}
              variant="contained"
              loadingPosition={"end"}
              endIcon={<ArrowForwardOutlined />}
              type="submit"
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default CreateInvitationDialog;
