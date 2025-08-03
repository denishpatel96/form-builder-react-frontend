import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { HIDE_TOAST_DURATION, OrgMemberRole, ORG_MEMBER_ROLES } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { OrgMemberInvite, useCreateOrgMemberInvitationMutation } from "../../store/features/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import DeleteOrgMemberInvitationDialog from "./DeleteOrgMemberInvitationDialog";

const ChangeOrgMemberInvitationDropDown = ({
  orgMemberInvitation,
}: {
  onSuccess?: () => void;
  button?: ReactNode;
  orgMemberInvitation: OrgMemberInvite;
}) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
  const [createOrgMemberInvitation, { isLoading, reset }] = useCreateOrgMemberInvitationMutation();

  const handleSubmit = async (role: OrgMemberRole) => {
    if (isLoading || role === orgMemberInvitation.role) return;
    const toastId = new Date().valueOf();
    try {
      await createOrgMemberInvitation({
        orgId: username,
        email: orgMemberInvitation.email,
        role,
      }).unwrap();
      dispatch(
        showToast({
          id: toastId,
          message: "Invitation updated successfully",
          severity: "success",
        })
      );
    } catch (error) {
      console.log("Error updating invitation : ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error updating invitation",
          severity: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideToast(toastId)), HIDE_TOAST_DURATION);
    reset();
  };

  return (
    <TextField
      sx={{ width: 100 }}
      id="member-role"
      select
      SelectProps={{ native: false, renderValue: (value) => value as string }}
      value={orgMemberInvitation.role}
      disabled={isLoading}
      onChange={(e) => e.target.value !== "remove" && handleSubmit(e.target.value as OrgMemberRole)}
    >
      {ORG_MEMBER_ROLES.map((option) => (
        <MenuItem key={option.label} value={option.label}>
          <Stack>
            <Typography>{option.label}</Typography>
            <Typography variant="caption">{option.description}</Typography>
          </Stack>
        </MenuItem>
      ))}
      <DeleteOrgMemberInvitationDialog
        orgMemberInvitation={orgMemberInvitation}
        button={
          <MenuItem color="error" key={"remove-member"} value={"remove"}>
            <Typography color="error">Delete invitation</Typography>
          </MenuItem>
        }
      />
    </TextField>
  );
};

export default ChangeOrgMemberInvitationDropDown;
