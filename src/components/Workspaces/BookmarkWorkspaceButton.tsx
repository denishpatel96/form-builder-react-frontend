import { BookmarkAdd, BookmarkAdded } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import React from "react";
import { useUpdateWorkspaceMutation, Workspace } from "../../store/features/api";
import { useAppSelector } from "../../store/hooks";

type Props = {
  workspace: Workspace;
};

const BookmarkWorkspaceButton = ({ workspace }: Props) => {
  const username = useAppSelector((state) => state.auth.username);
  const [updateWorkspace, { isLoading }] = useUpdateWorkspaceMutation();

  const handleClick = async () => {
    try {
      await updateWorkspace({
        orgId: username,
        workspaceId: workspace.workspaceId,
        bookmarked: !workspace.bookmarked,
      }).unwrap();
    } catch (error) {
      console.log("Error bookmarking workspace : ", error);
    }
  };

  return (
    <IconButton
      title={workspace.bookmarked ? "Bookmarked" : "Bookmark"}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress size={18} />
      ) : workspace.bookmarked ? (
        <BookmarkAdded />
      ) : (
        <BookmarkAdd />
      )}
    </IconButton>
  );
};

export default BookmarkWorkspaceButton;
