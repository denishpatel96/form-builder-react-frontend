import { Clear } from "@mui/icons-material";
import { FormHelperText, Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type ValueLabelFormatPropertyProps = {
  value: { prefix: string | undefined; suffix: string | undefined };
  onChange: (path: string, value: string | undefined) => void;
};

export const ValueLabelFormatProperty = ({
  value: { prefix, suffix },
  onChange,
}: ValueLabelFormatPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Value Label Format" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name={"value-label-prefix"}
            variant="standard"
            size="small"
            value={prefix}
            label="Prefix"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onChange("valueLabelFormat.prefix", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name={"value-label-suffix"}
            variant="standard"
            size="small"
            value={suffix}
            label="Suffix"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onChange("valueLabelFormat.suffix", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormHelperText>
            Format label with prefix and suffix e.g. value 100 with prefix($) - $100 & suffix(/ hr)
            - $100/hr
          </FormHelperText>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
