import { FormHelperText, Grid, Switch, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type PatternValidationPropertyProps = {
  value: {
    validatePattern: boolean;
    pattern?: string;
    msgPattern?: string;
  };
};

export const PatternValidationProperty = ({
  value: { validatePattern, pattern, msgPattern },
}: PatternValidationPropertyProps) => {
  const dispatch = useAppDispatch();
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
              dispatch(changeFieldProp({ path: "validatePattern", value: e.target.checked }))
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
                    dispatch(changeFieldProp({ path: "msgPattern", value: e.target.value }))
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
                    dispatch(changeFieldProp({ path: "pattern", value: e.target.value }))
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
