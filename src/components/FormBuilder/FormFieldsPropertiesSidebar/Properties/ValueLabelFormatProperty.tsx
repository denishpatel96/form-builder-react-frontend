import { FormHelperText, Grid, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type ValueLabelFormatPropertyProps = {
  value: { prefix: string | undefined; suffix: string | undefined };
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const ValueLabelFormatProperty = ({
  value: { prefix, suffix },
  onUpdate,
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
              onUpdate("valueLabelFormat.prefix", e.target.value);
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
              onUpdate("valueLabelFormat.suffix", e.target.value);
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
