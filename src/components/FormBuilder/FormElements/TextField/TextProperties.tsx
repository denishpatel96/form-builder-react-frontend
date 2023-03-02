import { Clear } from "@mui/icons-material";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { IFieldPropertiesChange, IFieldValidationsChange, ITextProps } from "../..";
import { NumericFormat } from "react-number-format";

// Additional CSS
// Length and Pattern Validation
// Duplicate field button
// Entry limit - char/words
// Editor mode
// Input Mask

interface ITextPropertiesProps {
  field: ITextProps;
  onPropsChange: IFieldPropertiesChange;
  onValidationsChange: IFieldValidationsChange;
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  ":hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TextProperties = ({ field, onPropsChange, onValidationsChange }: ITextPropertiesProps) => {
  const { props, validations } = field;

  const Title = ({ text }: { text: string }) => {
    return (
      <Typography variant="subtitle2" style={{ opacity: 0.7 }}>
        {text}
      </Typography>
    );
  };
  return (
    <List sx={{ overflowY: "auto" }}>
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
              value={props.label}
              required
              fullWidth
              error={!props.label}
              helperText={!props.label && "Field label is required"}
              InputProps={{
                endAdornment: props.label && (
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
                onPropsChange(e.target.name, e.target.value)
              }
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
              value={props.placeholder}
              fullWidth
              InputProps={{
                endAdornment: props.placeholder && (
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
                onPropsChange(e.target.name, e.target.value)
              }
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
              value={props.helperText}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onPropsChange(e.target.name, e.target.value)
              }
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
              value={props.defaultValue}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                onPropsChange("value", e.target.value);
                onPropsChange(e.target.name, e.target.value);
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
              name={"title"}
              variant="standard"
              size="small"
              value={props.title}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                onPropsChange(e.target.name, e.target.value);
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
              checked={props.required}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onPropsChange(e.target.name, e.target.checked)
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
            <Title text="Multiline" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"multiline"}
              checked={props.multiline}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked) {
                  onValidationsChange("patternValidation", "required", false);
                }
                onPropsChange(e.target.name, e.target.checked);
              }}
              inputProps={{ "aria-label": "text-required-property" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Create textarea with multiple lines</FormHelperText>
          </Grid>
          <Grid item>
            {props.multiline && (
              <Grid container spacing={1} pt={2}>
                <Grid item xs={12}>
                  <NumericFormat
                    size="small"
                    name={"rows"}
                    label={"Rows"}
                    fullWidth
                    allowNegative={false}
                    variant="standard"
                    value={props.rows}
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
                    value={props.minRows}
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
                    value={props.maxRows}
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
            <Title text="Length Validation" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"lengthValidation"}
              checked={validations?.lengthValidation?.required}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onValidationsChange("lengthValidation", "required", e.target.checked)
              }
              inputProps={{ "aria-label": "text-required-property" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Validate input for length before submission</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            {validations?.lengthValidation?.required && (
              <Grid container spacing={1} pt={2}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    name={"message"}
                    label={"Message"}
                    variant="standard"
                    value={validations?.lengthValidation?.message}
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                      onValidationsChange("lengthValidation", "message", e.target.value)
                    }
                    helperText={"Message to display when validation fails."}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    size="small"
                    name={"min"}
                    label={"Min"}
                    fullWidth
                    allowNegative={false}
                    variant="standard"
                    value={validations?.lengthValidation?.min}
                    customInput={TextField}
                    onValueChange={({ value }) => {
                      onValidationsChange("lengthValidation", "min", +value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    size="small"
                    name={"max"}
                    label={"Max"}
                    fullWidth
                    allowNegative={false}
                    variant="standard"
                    value={validations?.lengthValidation?.max}
                    customInput={TextField}
                    onValueChange={({ value }) => {
                      onValidationsChange("lengthValidation", "max", +value);
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

      {!props.multiline && (
        <StyledListItem>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Title text="Pattern Validation" />
            </Grid>
            <Grid item xs={12}>
              <Switch
                name={"patternValidation"}
                checked={validations?.patternValidation?.required}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onValidationsChange("patternValidation", "required", e.target.checked)
                }
                inputProps={{ "aria-label": "pattern-validation-required-property" }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>
                Validate input for regular expression (regex) pattern.
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              {validations?.patternValidation?.required && (
                <Grid container spacing={1} pt={2}>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      name={"message"}
                      label={"Message"}
                      variant="standard"
                      value={validations?.patternValidation?.message}
                      fullWidth
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        onValidationsChange("patternValidation", "message", e.target.value)
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
                      value={validations?.patternValidation?.pattern}
                      fullWidth
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        onValidationsChange("patternValidation", "pattern", e.target.value)
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
            <Title text="Variant" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={props.variant}
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
            <Title text="Compactness" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={props.size}
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
            <Title text="Margin" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={props.margin}
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

export default TextProperties;
