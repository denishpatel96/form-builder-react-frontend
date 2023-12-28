import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type PlaceholderPropertyProps = {
  value: string | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const PlaceholderProperty = ({ value, onUpdate }: PlaceholderPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Placeholder" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={"placeholder"}
            variant="standard"
            size="small"
            value={value}
            fullWidth
            InputProps={{
              endAdornment: value && (
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => {
                    onUpdate("placeholder", "");
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              onUpdate("placeholder", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
