import React from "react";
import OrganizationSettings from "../components/OrganizationSettings";
import AuthWrapper from "../hoc/AuthWrapper";

export const OrganizationSettingsPage = () => {
  return (
    <AuthWrapper>
      <OrganizationSettings />
    </AuthWrapper>
  );
};
