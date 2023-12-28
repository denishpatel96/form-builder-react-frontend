import { Clear } from "@mui/icons-material";
import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type LabelPropertyProps = {
  value: string | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const LabelProperty = ({ value, onUpdate }: LabelPropertyProps) => {
  // this state is necessary to track whether value has been updated since last request sent.
  const [updated, setUpdated] = React.useState<boolean>(false);
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
                    setUpdated(true);
                    onUpdate("label", "", true);
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setUpdated(true);
              onUpdate("label", e.target.value, true);
            }}
            onBlur={() => {
              if (updated) {
                setUpdated(false);
                onUpdate("label", value);
              }
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
