import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import React, { ReactNode } from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type LabelPropertyProps = {
  value: string | undefined;
  onChange: (path: string, value: string | undefined) => void;
};

export const LabelProperty = ({ value, onChange }: LabelPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Field Label" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={"label"}
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
                    onChange("label", "");
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              onChange("label", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
