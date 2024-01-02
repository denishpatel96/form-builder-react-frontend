import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import { StyledListItem } from "../../Styles";
import PropTitle from "../Properties/PropTitle";
import { Clear } from "@mui/icons-material";

export const TextTypeProperty = ({
  title,
  path,
  value,
  onUpdate,
  multiline = false,
  minRows = 3,
}: {
  minRows?: number;
  multiline?: boolean;
  title: string;
  path: string;
  value: string | undefined;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
}) => {
  // this state is necessary to track whether value has been updated since last request sent.
  const [updated, setUpdated] = React.useState<boolean>(false);
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text={title} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name={path}
            variant="standard"
            size="small"
            value={value}
            fullWidth
            multiline={multiline}
            minRows={minRows}
            InputProps={{
              endAdornment: value && (
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => {
                    onUpdate(path, "", true);
                    setUpdated(true);
                  }}
                >
                  <Clear sx={{ height: 15, width: 15 }} />
                </IconButton>
              ),
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onUpdate(path, e.target.value, true);
              setUpdated(true);
            }}
            onBlur={() => {
              if (updated) {
                setUpdated(false);
                onUpdate(path, value);
              }
            }}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
