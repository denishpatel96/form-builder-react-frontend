import { Grid, Slider } from "@mui/material";
import React from "react";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type WidthPropertyProps = {
  value: 3 | 4 | 6 | 8 | 9 | 12;
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const WidthProperty = ({ value, onUpdate }: WidthPropertyProps) => {
  // this state is necessary to track whether value has been updated since last request sent.
  const [updated, setUpdated] = React.useState<boolean>(false);
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Width" />
        </Grid>
        <Grid item xs={12}>
          <Slider
            aria-label="Form element width"
            value={value}
            valueLabelDisplay="auto"
            onChange={(_, value) => {
              setUpdated(true);
              onUpdate("colSpan", value as number, true);
            }}
            onChangeCommitted={() => {
              if (updated) {
                setUpdated(false);
                onUpdate("colSpan", value);
              }
            }}
            step={null}
            marks={[3, 4, 6, 8, 9, 12].map((el) => ({ value: el, label: el }))}
            min={0}
            max={12}
          />
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
