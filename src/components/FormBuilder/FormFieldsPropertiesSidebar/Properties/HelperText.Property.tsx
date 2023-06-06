import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import { StyledListItem } from "../Styles";
import PropTitle from "./PropTitle";
import { Clear } from "@mui/icons-material";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type HelperTextPropertyProps = {
  value: string | undefined;
};

export const HelperTextProperty = ({ value }: HelperTextPropertyProps) => {
  const dispatch = useAppDispatch();
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
                    dispatch(changeFieldProp({ path: "helperText", value: "" }));
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              dispatch(changeFieldProp({ path: "helperText", value: e.target.value }))
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
