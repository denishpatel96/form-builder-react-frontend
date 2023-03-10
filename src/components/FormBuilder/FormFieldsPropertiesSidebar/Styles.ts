import { ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  ":hover,:active": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));
