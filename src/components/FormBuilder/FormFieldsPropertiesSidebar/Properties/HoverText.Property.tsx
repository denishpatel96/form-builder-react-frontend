import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type HoverTextPropertyProps = {
  value: string | undefined;
};

export const HoverTextProperty = ({ value }: HoverTextPropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Hover Text" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={"title"}
            variant="standard"
            size="small"
            value={value}
            fullWidth
            multiline
            minRows={3}
            InputProps={{
              endAdornment: value && (
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => {
                    dispatch(changeFieldProp({ path: "title", value: "" }));
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              dispatch(changeFieldProp({ path: "title", value: e.target.value }));
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
