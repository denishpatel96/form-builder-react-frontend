import React from "react";
import { Alert, Snackbar, Stack, Slide } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideToast } from "../../store/features/signalSlice";

const Toast = () => {
  const toasts = useAppSelector((state) => state.signal.toasts);
  const dispatch = useAppDispatch();
  const hide = (id: number) => {
    dispatch(hideToast(id));
  };

  return (
    <Snackbar
      sx={{ marginTop: "50px" }}
      ClickAwayListenerProps={{
        onClickAway: (e) => {
          e.stopPropagation();
        },
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={(props) => (
        <Slide {...props} direction="down" mountOnEnter unmountOnExit />
      )}
      open={toasts.length > 0}
    >
      <Stack direction={"column-reverse"} spacing={2}>
        {toasts.map((toast) => {
          const { message, severity, id } = toast;
          return (
            <Alert key={id} onClose={() => hide(id)} severity={severity} sx={{ width: "100%" }}>
              {message}
            </Alert>
          );
        })}
      </Stack>
    </Snackbar>
  );
};

export default Toast;
