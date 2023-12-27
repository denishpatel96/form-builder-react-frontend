import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";

type HoverTextPropertyProps = {
  value: string | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const HoverTextProperty = ({ value, onUpdate }: HoverTextPropertyProps) => {
  // this state is necessary to track whether value has been updated since last request sent.
  const [updated, setUpdated] = React.useState<boolean>(false);
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
                    setUpdated(true);
                    onUpdate("title", "");
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setUpdated(true);
              onUpdate("title", e.target.value);
            }}
            onBlur={() => {
              if (updated) {
                setUpdated(false);
                onUpdate("title", value);
              }
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
