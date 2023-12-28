import { Box, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFormFieldItemPlaceholder = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  padding: "15px 0",
  cursor: "move",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.action.hover,
  border: `2px dashed ${theme.palette.secondary.main}`,
}));

export const StyledFormFieldItem = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  height: "100%",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  padding: "10px",
  cursor: "move",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  ":hover,:active": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledFormFieldItemDragOverlay = styled(ListItem)(({ theme }) => ({
  boxShadow: theme.shadows[10],
  height: "100%",
  width: "100%",
  transform: "rotate(10deg)",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  ".MuiSvgIcon-root": { color: theme.palette.secondary.main },
  padding: "15px 0",
  cursor: "move",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  opacity: 0.85,
  ":hover,:active": {
    backgroundColor: theme.palette.action.hover,
    // color: theme.palette.secondary.main,
    opacity: 1,
  },
}));
