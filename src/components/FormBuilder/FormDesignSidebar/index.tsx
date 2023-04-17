import { ChevronLeftOutlined, PaletteOutlined } from "@mui/icons-material";
import {
  Typography,
  Box,
  IconButton,
  Drawer,
  Divider,
  TextFieldProps,
  List,
  ListSubheader,
  SimplePaletteColorOptions,
  Tabs,
  Tab,
} from "@mui/material";
import React from "react";
import { IFieldPropertiesChangeFunc, IFormDesignProps } from "../Types";
import { NumberValueProperty } from "./Properties/NumberValue.Property";
import { ColorValueProperty } from "./Properties/ColorValue.Property";
import { ModeProperty } from "./Properties/Mode.Property";
import { getTheme } from "../../../theme";
import { ImageURLProperty } from "./Properties/ImageURL.Property";
import { DRAWER_WIDTH_DESKTOP, DRAWER_WIDTH_TABLET } from "../../../constants";

type FormDesignSidebarProps = {
  formProperties: IFormDesignProps;
  onPropsChange: IFieldPropertiesChangeFunc;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PixelInputProps: TextFieldProps["InputProps"] = {
  endAdornment: (
    <Typography pl={2} variant="subtitle2" color="grey">
      PX
    </Typography>
  ),
};

const FormDesignSidebar = ({
  formProperties,
  onPropsChange,
  isOpen,
  setIsOpen,
}: FormDesignSidebarProps) => {
  const {
    formWidth,
    verticalPadding,
    horizontalPadding,
    horizontalSpacing,
    verticalSpacing,
    labelFontWeight,
    labelColor,
    palette,
    pageImage,
    formImage,
  } = formProperties;

  const defaultTheme = getTheme({ palette: { mode: formProperties.palette?.mode || "light" } });

  const [tabValue, setTabValue] = React.useState(1);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  function getTabProps(index: number) {
    return {
      id: `form-design-tab-${index}`,
      "aria-controls": `form-design-tabpanel-${index}`,
    };
  }

  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      anchor={"left"}
      variant={isOpen ? "persistent" : "temporary"}
      PaperProps={{
        sx: {
          width: { xs: DRAWER_WIDTH_TABLET, xl: DRAWER_WIDTH_DESKTOP },
          ...(isOpen && { position: "relative" }),
        },
      }}
      sx={{
        ".MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Box
        sx={{
          maxHeight: 50,
          minHeight: 50,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaletteOutlined sx={{ height: 20, width: 20 }} />
          <Typography pl={1} variant="subtitle1" textAlign={"center"}>
            Form Design
          </Typography>
        </Box>

        <IconButton onClick={() => setIsOpen(false)} sx={{ ml: "auto" }}>
          <ChevronLeftOutlined />
        </IconButton>
      </Box>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="Styles" {...getTabProps(0)} />
        <Tab label="Colors" {...getTabProps(1)} />
      </Tabs>
      <Divider />
      <Box role="tabpanel" hidden={tabValue !== 0} sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <List disablePadding>
          <NumberValueProperty
            name="formWidth"
            label="Form Width"
            value={formWidth}
            onChange={onPropsChange}
            path={"formWidth"}
            InputProps={PixelInputProps}
          />
          <NumberValueProperty
            name="verticalPadding"
            label="Vertical Padding"
            value={verticalPadding}
            onChange={onPropsChange}
            path={"verticalPadding"}
            InputProps={PixelInputProps}
          />
          <NumberValueProperty
            name="horizontalPadding"
            label="Horizontal Padding"
            value={horizontalPadding}
            onChange={onPropsChange}
            path={"horizontalPadding"}
            InputProps={PixelInputProps}
          />
          <NumberValueProperty
            name="verticalSpacing"
            label="Vertical Spacing"
            value={verticalSpacing}
            onChange={onPropsChange}
            path={"verticalSpacing"}
            InputProps={PixelInputProps}
          />
          <NumberValueProperty
            name="horizontalSpacing"
            label="Horizontal Spacing"
            value={horizontalSpacing}
            onChange={onPropsChange}
            path={"horizontalSpacing"}
            InputProps={PixelInputProps}
          />
        </List>
      </Box>
      <Box role="tabPanel" hidden={tabValue !== 1} sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <List disablePadding sx={{ overflowY: "auto", overflowX: "hidden" }}>
          <ModeProperty
            value={palette?.mode || defaultTheme.palette?.mode}
            onChange={onPropsChange}
          />

          <ListSubheader sx={{ backgroundColor: "action.hover" }}>
            <Typography variant="overline">Background</Typography>
          </ListSubheader>
          <ColorValueProperty
            name="pageColor"
            label="Page Color"
            value={palette?.background?.default}
            defaultValue={defaultTheme.palette?.background?.default}
            onChange={onPropsChange}
            path={"palette.background.default"}
          />
          <ImageURLProperty
            name="pageImage"
            label="Page Image URL"
            value={pageImage}
            path={"pageImage"}
            onChange={onPropsChange}
          />
          <ColorValueProperty
            name="formColor"
            label="Form Color"
            value={palette?.background?.paper}
            defaultValue={defaultTheme.palette?.background?.paper}
            onChange={onPropsChange}
            path={"palette.background.paper"}
          />
          <ImageURLProperty
            name="formImage"
            label="Form Image URL"
            value={formImage}
            path={"formImage"}
            onChange={onPropsChange}
          />
          <ListSubheader sx={{ backgroundColor: "action.hover" }}>
            <Typography variant="overline">Text</Typography>
          </ListSubheader>
          <ColorValueProperty
            name="textPrimaryColor"
            label="Text Primary Color"
            value={palette?.text?.primary}
            defaultValue={defaultTheme.palette?.text?.primary}
            onChange={onPropsChange}
            path={"palette.text.primary"}
          />
          <ColorValueProperty
            name="textSecondaryColor"
            label="Text Secondary Color"
            value={palette?.text?.secondary}
            defaultValue={defaultTheme.palette?.text?.secondary}
            onChange={onPropsChange}
            path={"palette.text.secondary"}
          />
          <ColorValueProperty
            name="textDisabledColor"
            label="Text Disabled Color"
            value={palette?.text?.disabled}
            defaultValue={defaultTheme.palette?.text?.disabled}
            onChange={onPropsChange}
            path={"palette.text.disabled"}
          />
          <ListSubheader sx={{ backgroundColor: "action.hover" }}>
            <Typography variant="overline">Primary Color</Typography>
          </ListSubheader>
          <ColorValueProperty
            name="primaryColor"
            label="Primary Color"
            value={(palette?.primary as SimplePaletteColorOptions)?.main}
            defaultValue={(defaultTheme.palette?.primary as SimplePaletteColorOptions)?.main}
            onChange={onPropsChange}
            path={"palette.primary.main"}
          />
          <ColorValueProperty
            name="primaryContrastTextColor"
            label="Primary Contrast Text Color"
            value={(palette?.primary as SimplePaletteColorOptions)?.contrastText}
            defaultValue={
              (defaultTheme.palette?.primary as SimplePaletteColorOptions)?.contrastText
            }
            onChange={onPropsChange}
            path={"palette.primary.contrastText"}
          />
          <ListSubheader sx={{ backgroundColor: "action.hover" }}>
            <Typography variant="overline">Secondary Color</Typography>
          </ListSubheader>
          <ColorValueProperty
            name="secondaryColor"
            label="Secondary Color"
            value={(palette?.secondary as SimplePaletteColorOptions)?.main}
            defaultValue={(defaultTheme.palette?.secondary as SimplePaletteColorOptions)?.main}
            onChange={onPropsChange}
            path={"palette.secondary.main"}
          />
          <ColorValueProperty
            name="secondaryContrastTextColor"
            label="Secondary Contrast Text Color"
            value={(palette?.secondary as SimplePaletteColorOptions)?.contrastText}
            defaultValue={
              (defaultTheme.palette?.secondary as SimplePaletteColorOptions)?.contrastText
            }
            onChange={onPropsChange}
            path={"palette.secondary.contrastText"}
          />
        </List>
      </Box>
    </Drawer>
  );
};

export default FormDesignSidebar;
