import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import { StyledListItem } from "../Styles";
import PropTitle from "./PropTitle";
import { Clear } from "@mui/icons-material";

type HelperTextPropertyProps = {
  value: string | undefined;
  onChange: (path: string, value: string | undefined) => void;
};

export const HelperTextProperty = ({ value, onChange }: HelperTextPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Helper Text" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={"helperText"}
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
                    onChange("helperText", "");
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              onChange("helperText", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
