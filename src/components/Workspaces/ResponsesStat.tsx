import { Alert, Box, Button, LinearProgress, Skeleton, Typography } from "@mui/material";
import React from "react";
import { ANIMATION_SKELETON } from "../../constants";
import { useGetUserQuery } from "../../store/features/api";
import { useAppSelector } from "../../store/hooks";

const ResponsesStat = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const {
    //isLoading: isUserLoading,
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
    data: user,
    error: userError,
  } = useGetUserQuery(userId, { skip: !userId });

  let content;

  if (isUserFetching) {
    content = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height="100%" width={"100%"} />
    );
  } else if (isUserSuccess && user) {
    const userName = `${user.firstName} ${user.lastName}`;
    // calculate response in last billing cycle(month)
    const responsesCollected = user.responseCount;
    // Monthly response limit
    const responseLimit = 100;
    content = (
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography variant="subtitle1" py={{ xs: 1, sm: 3 }}>
          <strong>{userName}'s</strong> account
        </Typography>
        <Typography pb={{ xs: 1, sm: 2 }}>Responses Collected</Typography>
        <LinearProgress variant="determinate" value={100 * (responsesCollected / responseLimit)} />
        <Typography textAlign={"right"}>
          <strong>{responsesCollected}</strong> / {responseLimit}
        </Typography>
        <Button>Increase response limit</Button>
      </Box>
    );
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
    content = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  return <>{content}</>;
};

export default ResponsesStat;
