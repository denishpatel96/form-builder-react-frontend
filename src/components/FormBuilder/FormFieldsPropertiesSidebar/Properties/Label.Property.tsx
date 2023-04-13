import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type LabelPropertyProps = {
  value: string | undefined;
};

export const LabelProperty = ({ value }: LabelPropertyProps) => {
  const dispatch = useAppDispatch();
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
                    dispatch(changeFieldProp({ path: "label", value: "" }));
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              dispatch(changeFieldProp({ path: "label", value: e.target.value }))
            }
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
