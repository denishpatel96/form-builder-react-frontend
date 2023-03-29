import { FormHelperText, Grid, Switch, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type PatternValidationPropertyProps = {
  value: {
    validatePattern: boolean;
    pattern?: string;
    msgPattern?: string;
  };
  onChange: (path: string, value: boolean | number | string | undefined) => void;
};

export const PatternValidationProperty = ({
  value: { validatePattern, pattern, msgPattern },
  onChange,
}: PatternValidationPropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <PropTitle text="Pattern Validation" />
          <FormHelperText>Validate input for regular expression (regex) pattern.</FormHelperText>
        </Grid>
        <Grid item xs={2}>
          <Switch
            name={"validatePattern"}
            checked={validatePattern}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("validatePattern", e.target.checked)
            }
          />
        </Grid>
        <Grid item xs={12}>
          {validatePattern && (
            <Grid container spacing={1} pt={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name={"msgPattern"}
                  label={"Message"}
                  variant="standard"
                  value={msgPattern}
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    onChange("msgPattern", e.target.value)
                  }
                  helperText={"Message to display when validation fails."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name={"pattern"}
                  label={"Pattern"}
                  variant="standard"
                  value={pattern}
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    onChange("pattern", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
