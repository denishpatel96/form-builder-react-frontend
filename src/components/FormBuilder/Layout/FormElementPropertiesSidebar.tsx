import { Close, InfoOutlined, PushPinOutlined } from "@mui/icons-material";
import { Typography, Divider, Box, IconButton, Tooltip, ToggleButton } from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../../constants";
import TextProperties from "../FormElements/TextField/TextProperties";
import { ITextProps, IFieldPropertiesChangeFunc } from "..";

type IFormElementProps = {
  field: ITextProps;
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
          height: 50,
          display: "flex",
          alignItems: "center",
          pl: 2,
        }}
      >
        <Tooltip title={isPinned ? "Unpin" : "Pin"}>
          <ToggleButton
            sx={{ height: 25, width: 25 }}
            value={true}
            selected={isPinned}
            onChange={onTogglePin}
          >
            <PushPinOutlined sx={{ height: 20, width: 20 }} />
          </ToggleButton>
        </Tooltip>
        <Typography variant="overline" ml={1}>
          {field ? `${field.fieldType} Properties` : "Element Properties"}{" "}
        </Typography>
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
        <TextProperties field={field} onPropsChange={onPropsChange} />
      )}
    </>
  );
};

export default FormElementPropertiesSidebar;
