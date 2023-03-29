import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type DefaultTextValuePropertyProps = {
  value: string | undefined;
  onChange: (path: string, value: string | undefined) => void;
};

export const DefaultTextValueProperty = ({ value, onChange }: DefaultTextValuePropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Default Value" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={"defaultValue"}
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
                    onChange("defaultValue", "");
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onChange("defaultValue", e.target.value);
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
