import {
  Alert,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { ANIMATION_SKELETON } from "../../constants";
import { useGetUserQuery } from "../../store/features/api";
import { useAppSelector } from "../../store/hooks";

const ResponseCount = () => {
  const username = useAppSelector((state) => state.auth.username);
  const {
    //isLoading: isUserLoading,
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
    data: user,
    error: userError,
  } = useGetUserQuery(username, { skip: !username });

  let content;

  if (isUserFetching) {
    content = (
      <Skeleton variant="rectangular" animation={ANIMATION_SKELETON} height="100%" width={"100%"} />
    );
  } else if (isUserSuccess && user) {
    // calculate response in last billing cycle(month)
    const responsesCollected = user.responseCount;
    // Monthly response limit
    const responseLimit = 100;

    content = (
      <Card>
        <CardContent>
          <Typography pb={{ xs: 1, sm: 2 }}>Responses Collected</Typography>
          <LinearProgress
            variant="determinate"
            value={100 * (responsesCollected / responseLimit)}
          />
          <Typography textAlign={"right"}>
            <strong>{responsesCollected}</strong> / {responseLimit}
          </Typography>
          <Button>Increase response limit</Button>
        </CardContent>
      </Card>
    );
  } else if (isUserError) {
    console.log("Error fetching user :", userError);
    content = <Alert severity="error">Error occured. Please reload the page.</Alert>;
  }

  return <>{content}</>;
};

export default ResponseCount;
