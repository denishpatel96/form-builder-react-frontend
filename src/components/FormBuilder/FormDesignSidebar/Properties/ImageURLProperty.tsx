import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { StyledListItem } from "../../Styles";

type ImageURLPropertyProps = {
  value: string;
  onChange: (path: string, value: string) => void;
  label: string;
  name: string;
  path: string;
};

export const ImageURLProperty = ({ label, name, path, value, onChange }: ImageURLPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">{label}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={name}
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
                    onChange(path, "");
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onChange(path, e.target.value);
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
