import React from "react";
import Spinner from "../components/Reusable/Spinner";
import UserSettings from "../components/UserSettings";
import AuthWrapper from "../hoc/AuthWrapper";
import { useGetUserQuery } from "../store/features/api";
import { useAppSelector } from "../store/hooks";

export const UserSettingsPage = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const {
    //isLoading: isUserLoading,
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
    data: userData,
    error: userError,
  } = useGetUserQuery(userId, { skip: !userId });

  let content;

  if (isUserFetching) {
    content = <Spinner text="Preparing Data..." />;
  } else if (isUserSuccess && userData) {
    content = <UserSettings />;
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
  }

  return <AuthWrapper>{content}</AuthWrapper>;
};
