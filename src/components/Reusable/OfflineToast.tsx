import React from "react";
import { Alert, Snackbar, Slide, AlertTitle } from "@mui/material";

const OfflineToast = () => {
  const [isOnline, setIsOnline] = React.useState<boolean>(navigator.onLine);

  React.useEffect(() => {
    const onlineHandler = () => setIsOnline(true);
    const offlineHandler = () => setIsOnline(false);
    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <Snackbar
      sx={{ marginTop: "30px" }}
      ClickAwayListenerProps={{
        onClickAway: (e) => {
          e.stopPropagation();
        },
      }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={(props) => (
        <Slide {...props} direction="down" mountOnEnter unmountOnExit />
      )}
      open={!isOnline}
    >
      <Alert severity={"info"} sx={{ width: "100%" }}>
        <AlertTitle>You are offline.</AlertTitle>
        Please check your internet connection.
      </Alert>
    </Snackbar>
  );
};

export default OfflineToast;
