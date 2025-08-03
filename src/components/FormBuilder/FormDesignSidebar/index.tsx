import { ChevronLeftOutlined, ExpandMore, PaletteOutlined } from "@mui/icons-material";
import {
  Typography,
  Box,
  IconButton,
  Drawer,
  Divider,
  TextFieldProps,
  List,
  SimplePaletteColorOptions,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React from "react";
import { IFormDesignProps } from "../Types";
import { NumberValueProperty } from "./Properties/NumberValueProperty";
import { ColorValueProperty } from "./Properties/ColorValueProperty";
import { ModeProperty } from "./Properties/ModeProperty";
import { getCustomTheme } from "../../../theme";
import { ImageURLProperty } from "./Properties/ImageURLProperty";
import { DRAWER_WIDTH_TABLET } from "../../../constants";
import { styled } from "@mui/material/styles";

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: 0,
  margin: 0,
  background: theme.palette.background.paper,
}));

type FormDesignSidebarProps = {
  formProperties: IFormDesignProps;
  onPropsChange: (path: string, value: any) => void;
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
    palette,
    pageBgImage,
    pageBgColor,
    formBgImage,
    formBgColor,
  } = formProperties;

  const defaultTheme = getCustomTheme({ mode: formProperties.palette?.mode || "light" });

  const [tabValue, setTabValue] = React.useState(1);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  function getTabProps(index: number) {
    return {
      id: `form-design-tab-${index}`,
      "aria-controls": `form-design-tabpanel-${index}`,
    };
  }

  const [expandedId, setExpandedId] = React.useState<string>("bg");
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      anchor={"left"}
      variant={isOpen ? "persistent" : "temporary"}
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH_TABLET,
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
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons={false}>
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

          <Accordion expanded={expandedId === "bg"}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              onClick={() => setExpandedId((prev) => (prev === "bg" ? "" : "bg"))}
            >
              <Typography variant="overline">Background</Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
              <ColorValueProperty
                name="formBgColor"
                label="Form Background Color"
                value={formBgColor}
                defaultValue={defaultTheme.palette?.background?.default}
                onChange={onPropsChange}
                path={"formBgColor"}
              />
              <ImageURLProperty
                name="formBgImage"
                label="Form Background Image URL"
                value={formBgImage}
                path={"formBgImage"}
                onChange={onPropsChange}
              />
              <ColorValueProperty
                name="pageBgColor"
                label="Page Background Color"
                value={pageBgColor}
                defaultValue={defaultTheme.palette?.background?.paper}
                onChange={onPropsChange}
                path={"pageBgColor"}
              />
              <ImageURLProperty
                name="pageBgImage"
                label="Page Background Image URL"
                value={pageBgImage}
                path={"pageBgImage"}
                onChange={onPropsChange}
              />
            </StyledAccordionDetails>
          </Accordion>

          <Accordion expanded={expandedId === "text"}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              onClick={() => setExpandedId((prev) => (prev === "text" ? "" : "text"))}
            >
              <Typography variant="overline">Text</Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
              <ColorValueProperty
                name="textPrimaryColor"
                label="Input Text Color"
                value={palette?.text?.primary}
                defaultValue={defaultTheme.palette?.text?.primary}
                onChange={onPropsChange}
                path={"palette.text.primary"}
              />
              <ColorValueProperty
                name="textSecondaryColor"
                label="Label Text Color"
                value={palette?.text?.secondary}
                defaultValue={defaultTheme.palette?.text?.secondary}
                onChange={onPropsChange}
                path={"palette.text.secondary"}
              />
              <ColorValueProperty
                name="textDisabledColor"
                label="Disabled Text Color"
                value={palette?.text?.disabled}
                defaultValue={defaultTheme.palette?.text?.disabled}
                onChange={onPropsChange}
                path={"palette.text.disabled"}
              />
            </StyledAccordionDetails>
          </Accordion>

          <Accordion expanded={expandedId === "pc"}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              onClick={() => setExpandedId((prev) => (prev === "pc" ? "" : "pc"))}
            >
              <Typography variant="overline">Primary Color</Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
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
            </StyledAccordionDetails>
          </Accordion>

          <Accordion expanded={expandedId === "sc"}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              onClick={() => setExpandedId((prev) => (prev === "sc" ? "" : "sc"))}
            >
              <Typography variant="overline">Secondary Color</Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
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
            </StyledAccordionDetails>
          </Accordion>
        </List>
      </Box>
    </Drawer>
  );
};

export default FormDesignSidebar;
