import { ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  opacity: 0.85,
  ":hover,:active": {
    backgroundColor: theme.palette.action.hover,
    // color: theme.palette.secondary.main,
    opacity: 1,
  },
}));
