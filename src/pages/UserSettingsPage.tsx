import React from "react";
import UserSettings from "../components/UserSettings";
import AuthWrapper from "../hoc/AuthWrapper";

export const UserSettingsPage = () => {
  return (
    <AuthWrapper>
      <UserSettings />
    </AuthWrapper>
  );
};
