import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import React, { ReactNode } from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type PlaceholderPropertyProps = {
  value: string | undefined;
};

export const PlaceholderProperty = ({ value }: PlaceholderPropertyProps) => {
  const dispatch = useAppDispatch();
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
                    dispatch(changeFieldProp({ path: "placeholder", value: "" }));
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              dispatch(changeFieldProp({ path: "placeholder", value: e.target.value }))
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
