import {
  TextField,
  Switch,
  FormHelperText,
  ListItem,
  List,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { IFieldPropertiesChange, ITextProps } from "../..";

// disabled: false,
// error: false,
// fullWidth: true,
// id: `input-${elementCount}`,
// sx: {}, // additional CSS
// type: "text", // 'text','url','email','search','password'
// Duplicate field button
// Entry limit - char/words
// Editor mode
// Input Mask

interface ITextPropertiesProps {
  field: ITextProps;
  onFieldPropsChange: IFieldPropertiesChange;
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  ":hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TextProperties = ({ field, onFieldPropsChange }: ITextPropertiesProps) => {
  const { fieldProps } = field;

  const Title = ({ text }: { text: string }) => {
    return (
      <Typography variant="subtitle2" style={{ opacity: 0.7 }}>
        {text}
      </Typography>
    );
  };
  return (
    <List>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Field Label" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"label"}
              variant="standard"
              size="small"
              value={fieldProps.label}
              required
              fullWidth
              onChange={(e) => onFieldPropsChange(e.target.name, e.target.value)}
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Placeholder" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"placeholder"}
              variant="standard"
              size="small"
              value={fieldProps.placeholder}
              fullWidth
              onChange={(e) => onFieldPropsChange(e.target.name, e.target.value)}
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Helper Text" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"helperText"}
              variant="standard"
              size="small"
              value={fieldProps.helperText}
              fullWidth
              onChange={(e) => onFieldPropsChange(e.target.name, e.target.value)}
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Default Value" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"defaultValue"}
              variant="standard"
              size="small"
              value={fieldProps.defaultValue}
              fullWidth
              onChange={(e) => {
                onFieldPropsChange("value", e.target.value);
                onFieldPropsChange(e.target.name, e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Hover Text" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"hoverText"}
              variant="standard"
              size="small"
              value={fieldProps.defaultValue}
              fullWidth
              onChange={(e) => {
                onFieldPropsChange("value", e.target.value);
                onFieldPropsChange(e.target.name, e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Required" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"required"}
              checked={fieldProps.required}
              onChange={(e) => onFieldPropsChange(e.target.name, e.target.checked)}
              inputProps={{ "aria-label": "text-required-property" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Prevent submission if this field is empty</FormHelperText>
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Multiline" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"multiline"}
              checked={fieldProps.multiline}
              onChange={(e) => onFieldPropsChange(e.target.name, e.target.checked)}
              inputProps={{ "aria-label": "text-required-property" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Create textarea with multiple lines</FormHelperText>
          </Grid>
          <Grid item>
            {fieldProps.multiline && (
              <Grid container spacing={1} pt={2}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    name={"rows"}
                    label={"Rows"}
                    value={fieldProps.rows}
                    fullWidth
                    onChange={(e) => onFieldPropsChange(e.target.name, +e.target.value)}
                    helperText={"Fix number of rows"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    name={"minRows"}
                    label={"Min"}
                    value={fieldProps.minRows}
                    fullWidth
                    onChange={(e) => {
                      onFieldPropsChange("rows", 0);
                      onFieldPropsChange(e.target.name, +e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    name={"maxRows"}
                    label={"Max"}
                    value={fieldProps.maxRows}
                    fullWidth
                    onChange={(e) => {
                      onFieldPropsChange("rows", 0);
                      onFieldPropsChange(e.target.name, +e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormHelperText>Or you can define min rows and max rows.</FormHelperText>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Variant" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={fieldProps.variant}
              exclusive
              onChange={(e, value) => onFieldPropsChange("variant", value)}
              aria-label="Platform"
            >
              <ToggleButton value="standard">Standard</ToggleButton>
              <ToggleButton value="outlined">Outlined</ToggleButton>
              <ToggleButton value="filled">Filled</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Change the style of text input.</FormHelperText>
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Compactness" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={fieldProps.size}
              exclusive
              onChange={(e, value) => onFieldPropsChange("size", value)}
              aria-label="Platform"
            >
              <ToggleButton value="small">Compact</ToggleButton>
              <ToggleButton value="medium">Normal</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Compact the input size.</FormHelperText>
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text="Margin" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={fieldProps.margin}
              exclusive
              onChange={(e, value) => onFieldPropsChange("margin", value)}
              aria-label="Platform"
            >
              <ToggleButton value="none">None</ToggleButton>
              <ToggleButton value="dense">Dense</ToggleButton>
              <ToggleButton value="normal">Normal</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Change the vertical spacing.</FormHelperText>
          </Grid>
        </Grid>
      </StyledListItem>
    </List>
  );
};

export default TextProperties;
