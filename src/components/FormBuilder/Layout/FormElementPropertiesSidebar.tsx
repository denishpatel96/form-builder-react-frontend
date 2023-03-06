import { Close, InfoOutlined, PushPinOutlined, SettingsOutlined } from "@mui/icons-material";
import { Typography, Divider, Box, IconButton, Tooltip, ToggleButton } from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../../constants";
import TextProperties from "../FormElements/TextField/TextProperties";
import { FieldProps, IFieldPropertiesChangeFunc } from "../FormElements/Common/Types";
import { ITextProps } from "../FormElements/TextField/Text";
import RadioProperties from "../FormElements/Radio/RadioProperties";
import { IRadioProps } from "../FormElements/Radio/Radio";

type IFormElementProps = {
  field: FieldProps | undefined;
  onPropsChange: IFieldPropertiesChangeFunc;
  onClosePropertiesDrawer: () => void;
  onTogglePin: () => void;
  isPinned: boolean;
};

const FormElementPropertiesSidebar = ({
  field,
  onPropsChange,
  onClosePropertiesDrawer,
  onTogglePin,
  isPinned,
}: IFormElementProps) => {
  return (
    <>
      <Box
        sx={{
          maxHeight: 50,
          minHeight: 50,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Tooltip title={isPinned ? "Unpin" : "Pin"}>
          <ToggleButton
            sx={{ height: 25, width: 25, m: 1 }}
            value={true}
            selected={isPinned}
            onChange={onTogglePin}
          >
            <PushPinOutlined sx={{ height: 20, width: 20 }} />
          </ToggleButton>
        </Tooltip>
        <Divider orientation="vertical" />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <SettingsOutlined sx={{ height: 20, width: 20, ml: 2 }} />
          <Typography variant="overline" ml={1}>
            {field ? `${field.fieldType} Properties` : "Element Properties"}{" "}
          </Typography>
        </Box>
        {!isPinned && (
          <Tooltip title={"close"} sx={{ ml: "auto" }}>
            <IconButton size="small" onClick={() => onClosePropertiesDrawer()}>
              <Close sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Divider />
      {!field && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InfoOutlined color="secondary" sx={{ height: 30, width: 30 }} />
          <Typography variant="caption" textAlign={"center"}>
            Please select element from left to inspect properties.
          </Typography>
        </Box>
      )}
      {field && field.fieldType === FORM_ELEMENTS.TEXT && (
        <TextProperties field={field as ITextProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.RADIO && (
        <RadioProperties field={field as IRadioProps} onPropsChange={onPropsChange} />
      )}
    </>
  );
};

export default FormElementPropertiesSidebar;
