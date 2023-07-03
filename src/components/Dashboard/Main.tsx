import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import MHidden from "../Reusable/MHidden";
import WorkspaceMenu from "./WorkspaceMenu";
import { Workspace } from "../../store/features/userApi";

interface MainProps {
  toggleSidebarState: () => void;
  leftSidebarOpen: boolean;
  workspace: Workspace;
}

const Main = ({ leftSidebarOpen, toggleSidebarState, workspace }: MainProps) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  console.log("Workspace", workspace);
  return (
    <Box
      sx={{
        p: 4,
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        height: 50,
      }}
    >
      <MHidden width="lgUp">
        <IconButton onClick={toggleSidebarState}>
          {leftSidebarOpen ? <MenuOpenOutlined /> : <MenuOutlined />}
        </IconButton>
      </MHidden>
      <Typography variant="h5">{workspace.name}</Typography>
      <WorkspaceMenu open={menuOpen} onChange={(open) => setMenuOpen(open)} />
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
};

export default Main;
