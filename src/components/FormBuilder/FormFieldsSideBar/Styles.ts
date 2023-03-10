import { ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFormFieldItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  cursor: "move",
  ":hover,:active": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
    ".MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
  },
}));
