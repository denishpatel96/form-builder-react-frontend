import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { HIDE_TOAST_DURATION, OrgMemberRole, ORG_MEMBER_ROLES } from "../../constants";
import { hideToast, showToast } from "../../store/features/signalSlice";
import { OrgMember, useUpdateOrgMemberMutation } from "../../store/features/api";
import { useAppDispatch } from "../../store/hooks";
import { useParams } from "react-router-dom";
import DeleteOrgMemberDialog from "./DeleteOrgMemberDialog";

const ChangeOrgMemberRoleDropdown = ({ orgMember }: { orgMember: OrgMember }) => {
  const dispatch = useAppDispatch();
  const [updateOrgMember, { isLoading, reset }] = useUpdateOrgMemberMutation();
  const { orgId } = useParams() as { orgId: string };

  const handleSubmit = async (role: OrgMemberRole) => {
    if (isLoading) return;
    const toastId = new Date().valueOf();
    try {
      await updateOrgMember({
        orgId,
        userId: orgMember.userId,
        role,
      }).unwrap();
      dispatch(
        showToast({
          id: toastId,
          message: "Member role updated successfully",
          severity: "success",
        })
      );
    } catch (error) {
      console.log("Error updating member role: ", error);
      dispatch(
        showToast({
          id: toastId,
          message: "Error updating member role",
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
      value={orgMember.role}
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
      <DeleteOrgMemberDialog
        orgMember={orgMember}
        button={
          <MenuItem color="error" key={"remove-member"} value={"remove"}>
            <Typography color="error">Remove from Organization</Typography>
          </MenuItem>
        }
      />
    </TextField>
  );
};

export default ChangeOrgMemberRoleDropdown;
