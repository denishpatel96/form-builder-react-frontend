import { ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFormFieldItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  ".MuiSvgIcon-root": { color: theme.palette.grey[300] },
  cursor: "move",
  ":hover,:active": {
    backgroundColor: theme.palette.action.hover,
    ".MuiSvgIcon-root": { color: theme.palette.primary.main },
    '[data-testid="DragIndicatorIcon"]': {
      color: theme.palette.secondary.main,
    },
  },
}));

export const StyledFormFieldItemDragOverlay = styled(ListItem)(({ theme }) => ({
  cursor: "move",
  backgroundColor: theme.palette.background.paper,
  // border: `1px solid ${theme.palette.secondary.main}`,
  ".MuiSvgIcon-root": {
    color: theme.palette.secondary.main,
  },
  boxShadow: theme.shadows[10],
}));
