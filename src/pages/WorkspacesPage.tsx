import React from "react";
import Workspaces from "../components/Workspaces";
import AuthWrapper from "../hoc/AuthWrapper";

export const WorkspacesPage = () => {
  return (
    <AuthWrapper>
      <Workspaces />
    </AuthWrapper>
  );
};
