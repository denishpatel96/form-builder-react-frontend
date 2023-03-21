import { Clear, Title } from "@mui/icons-material";
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
  IconButton,
  Slider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { IFieldPropertiesChangeFunc } from "../../Types/Common";
import { NumericFormat } from "react-number-format";
import { ITextProps } from "../../Types/Text";
import { StyledListItem } from "../Styles";
import PropTitle from "./components/PropTitle";

// Additional CSS
// Length and Pattern Validation
// Duplicate field button
// Entry limit - char/words
// Editor mode
// Input Mask

export interface ITextPropertiesProps {
  field: ITextProps;
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const TextProperties = ({ field, onPropsChange }: ITextPropertiesProps) => {
  const {
    colSpan,
    hidden,
    name,
    id,
    label,
    defaultValue,
    helperText,
    margin,
    multiline,
    rows,
    maxRows,
    minRows,
    title,
    required,
    size,
    variant,
    maxLength,
    minLength,
    msgLength,
    msgPattern,
    pattern,
    placeholder,
    type,
    validateLength,
    validatePattern,
  } = field;

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
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
              value={label}
              required
              fullWidth
              error={!label}
              helperText={!label && "Field label is required"}
              InputProps={{
                endAdornment: label && (
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {
                      onPropsChange("label", "");
                    }}
                  >
                    <Clear sx={{ height: 15, width: 15 }} />
                  </IconButton>
                ),
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onPropsChange("label", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </StyledListItem>
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
              value={placeholder}
              fullWidth
              InputProps={{
                endAdornment: placeholder && (
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {
                      onPropsChange("placeholder", "");
                    }}
                  >
                    <Clear sx={{ height: 15, width: 15 }} />
                  </IconButton>
                ),
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onPropsChange("placeholder", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </StyledListItem>
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
              value={helperText}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onPropsChange("helperText", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Default Value" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"defaultValue"}
              variant="standard"
              size="small"
              value={defaultValue}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                onPropsChange("defaultValue", e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </StyledListItem>
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
              value={title}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                onPropsChange("title", e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Width" />
          </Grid>
          <Grid item xs={12}>
            <Slider
              aria-label="Form element width"
              value={colSpan}
              valueLabelDisplay="auto"
              onChange={(_, value: number | number[]) => {
                onPropsChange("colSpan", value);
              }}
              step={null}
              marks={[3, 4, 6, 8, 9, 12].map((el) => ({ value: el, label: el }))}
              min={0}
              max={12}
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Required" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"required"}
              checked={required}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onPropsChange("required", e.target.checked)
              }
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
            <PropTitle text="Hidden" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"hidden"}
              checked={hidden}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onPropsChange("hidden", e.target.checked)
              }
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Multiline" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"multiline"}
              checked={multiline}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked) {
                  onPropsChange("patternValidation.required", false);
                }
                onPropsChange("multiline", e.target.checked);
              }}
              inputProps={{ "aria-label": "text-required-property" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Create textarea with multiple lines</FormHelperText>
          </Grid>
          <Grid item>
            {multiline && (
              <Grid container spacing={1} pt={2}>
                <Grid item xs={12}>
                  <NumericFormat
                    size="small"
                    name={"rows"}
                    label={"Rows"}
                    fullWidth
                    allowNegative={false}
                    variant="standard"
                    value={rows}
                    customInput={TextField}
                    onValueChange={({ value }) => {
                      onPropsChange("rows", +value);
                    }}
                    helperText={"Fix number of rows"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    size="small"
                    name={"minRows"}
                    label={"Min"}
                    fullWidth
                    allowNegative={false}
                    variant="standard"
                    value={minRows}
                    customInput={TextField}
                    onValueChange={({ value }) => {
                      onPropsChange("rows", 0);
                      onPropsChange("minRows", +value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    size="small"
                    name={"maxRows"}
                    label={"Max"}
                    fullWidth
                    allowNegative={false}
                    variant="standard"
                    value={maxRows}
                    customInput={TextField}
                    onValueChange={({ value }) => {
                      onPropsChange("rows", 0);
                      onPropsChange("maxRows", +value);
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
            <PropTitle text="Length Validation" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"validateLength"}
              checked={validateLength}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onPropsChange("validateLength", e.target.checked)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Validate input for length before submission</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            {validateLength && (
              <Grid container spacing={1} pt={2}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    name={"msgLength"}
                    label={"Message"}
                    variant="standard"
                    value={msgLength}
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                      onPropsChange("msgLength", e.target.value)
                    }
                    helperText={"Message to display when validation fails."}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    size="small"
                    name={"minLength"}
                    label={"Min"}
                    fullWidth
                    allowNegative={false}
                    variant="standard"
                    value={minLength}
                    customInput={TextField}
                    onValueChange={({ value }) => {
                      onPropsChange("minLength", +value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    size="small"
                    name={"maxLength"}
                    label={"Max"}
                    fullWidth
                    allowNegative={false}
                    variant="standard"
                    value={maxLength}
                    customInput={TextField}
                    onValueChange={({ value }) => {
                      onPropsChange("maxLength", +value);
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

      {!multiline && (
        <StyledListItem>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <PropTitle text="Pattern Validation" />
            </Grid>
            <Grid item xs={12}>
              <Switch
                name={"validatePattern"}
                checked={validatePattern}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onPropsChange("validatePattern", e.target.checked)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>
                Validate input for regular expression (regex) pattern.
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              {validatePattern && (
                <Grid container spacing={1} pt={2}>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      name={"msgPattern"}
                      label={"Message"}
                      variant="standard"
                      value={msgPattern}
                      fullWidth
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        onPropsChange("msgPattern", e.target.value)
                      }
                      helperText={"Message to display when validation fails."}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      name={"pattern"}
                      label={"Pattern"}
                      variant="standard"
                      value={pattern}
                      fullWidth
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        onPropsChange("pattern", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </StyledListItem>
      )}

      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Variant" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={variant}
              exclusive
              onChange={(_, value: any) => onPropsChange("variant", value)}
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
            <PropTitle text="Compactness" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={size}
              exclusive
              onChange={(_, value: any) => onPropsChange("size", value)}
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
            <PropTitle text="Margin" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={margin}
              exclusive
              onChange={(_, value: any) => onPropsChange("margin", value)}
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
