import React from "react";
import Appbar from "../Reusable/Appbar";
import LeftSidebar from "../Reusable/LeftSidebar";
import WorkspaceList from "./WorkspaceList";
import WorkspaceDetails from "./WorkspaceDetails";
import AppbarContent from "./AppbarContent";
import { Divider } from "@mui/material";
import NavigationLinks from "./NavigationLinks";

const Workspaces = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(false);

  return (
    <>
      <Appbar>
        <AppbarContent />
      </Appbar>
      <LeftSidebar open={leftSidebarOpen} onChange={(open) => setLeftSidebarOpen(open)}>
        <WorkspaceList />
        <Divider />
        <NavigationLinks />
      </LeftSidebar>
      <WorkspaceDetails
        leftSidebarOpen={leftSidebarOpen}
        toggleSidebarState={() => setLeftSidebarOpen((prev) => !prev)}
      />
    </>
  );
};

export default Workspaces;
