import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import { StyledListItem } from "../../Styles";
import PropTitle from "./PropTitle";
import { Clear } from "@mui/icons-material";

type HelperTextPropertyProps = {
  value: string | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const HelperTextProperty = ({ value, onUpdate }: HelperTextPropertyProps) => {
  // this state is necessary to track whether value has been updated since last request sent.
  const [updated, setUpdated] = React.useState<boolean>(false);
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
                    onUpdate("helperText", "", true);
                    setUpdated(true);
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onUpdate("helperText", e.target.value, true);
              setUpdated(true);
            }}
            onBlur={() => {
              if (updated) {
                setUpdated(false);
                onUpdate("helperText", value);
              }
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
