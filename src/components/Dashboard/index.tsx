import React from "react";
import Appbar from "./Appbar";
import LeftSidebar from "./LeftSidebar";
import { useGetUserQuery } from "../../store/features/userApi";
import Spinner from "../Reusable/Spinner";
import Main from "./Main";

const Dashboard = ({ userId }: { userId: string }) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(false);
  const { isFetching, isSuccess, isError, data, error } = useGetUserQuery(userId);
  const [activeWorkspaceId, setActiveWorkspaceId] = React.useState<string>("");

  let content;
  if (isFetching) {
    content = <Spinner text="Preparing data..." />;
  } else if (isSuccess && data) {
    if (activeWorkspaceId === "") {
      setActiveWorkspaceId(data.workspaces[0].id);
    }
    const activeWorkspace = data.workspaces.find((w) => w.id === activeWorkspaceId);
    content = (
      <>
        <Appbar user={data.user} />
        <LeftSidebar
          user={data.user}
          workspaces={data.workspaces}
          open={leftSidebarOpen}
          onChange={(open) => setLeftSidebarOpen(open)}
          activeWorkspaceId={activeWorkspaceId}
          setActiveWorkspaceId={(id) => setActiveWorkspaceId(id)}
        />
        {activeWorkspace && (
          <Main
            leftSidebarOpen={leftSidebarOpen}
            toggleSidebarState={() => setLeftSidebarOpen((prev) => !prev)}
            workspace={activeWorkspace}
          />
        )}
      </>
    );
  } else if (isError) {
    console.log("Error fetching user :", error);
  }

  return <>{content}</>;
};

export default Dashboard;
