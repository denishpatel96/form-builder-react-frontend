import React from "react";
import Appbar from "../Reusable/Appbar";
import WorkspaceList from "./WorkspaceList";
import AppbarContent from "./AppbarContent";
import { Grid, Stack, Typography } from "@mui/material";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";

const Workspaces = () => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Appbar>
        <AppbarContent />
      </Appbar>
      <Grid container p={1}>
        <Grid item xs={12} md={6} p={4}>
          <Stack spacing={3}>
            <Typography variant="h4">Workspaces</Typography>
            <Typography>
              Use workspaces to group your forms by categories, divisions or departments.
            </Typography>

            <CreateWorkspaceDialog />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <WorkspaceList />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Workspaces;
