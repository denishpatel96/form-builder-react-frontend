import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";

import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Drawer,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FORM_ELEMENTS_LIST } from "../../../constants";
import { StyledFormFieldItem } from "./Styles";

interface IFormFieldsProps {
  activeId?: UniqueIdentifier | null;
  setSelectedFieldId: React.Dispatch<React.SetStateAction<string>>;
}

const FormFieldsSidebar = ({ activeId, setSelectedFieldId }: IFormFieldsProps) => {
  const theme = useTheme();

  return (
    <Drawer
      open
      onClick={() => setSelectedFieldId("")}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
        if (e?.key === "Escape" || e?.code === "Escape") {
          setSelectedFieldId("");
        }
      }}
      anchor={"left"}
      variant="persistent"
      PaperProps={{
        sx: {
          width: 200,
          position: "relative",
        },
      }}
    >
      <Typography sx={{ height: 50, lineHeight: "50px", pl: 2 }} variant="overline">
        Form Fields
      </Typography>
      <Divider />
      <List disablePadding>
        {FORM_ELEMENTS_LIST.map((element) => {
          const { attributes, listeners, setNodeRef } = useDraggable({
            id: element.id,
          });
          return (
            <StyledFormFieldItem key={element.id} ref={setNodeRef} {...listeners} {...attributes}>
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText>{element.label}</ListItemText>
            </StyledFormFieldItem>
          );
        })}
      </List>
      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <ListItem
            sx={{ borderWidth: 1, borderStyle: "solid", borderColor: theme.palette.divider }}
          >
            <ListItemIcon>{FORM_ELEMENTS_LIST.find((e) => e.id === activeId)?.icon}</ListItemIcon>
            <ListItemText>{FORM_ELEMENTS_LIST.find((e) => e.id === activeId)?.label}</ListItemText>
          </ListItem>
        ) : null}
      </DragOverlay>
    </Drawer>
  );
};

export default FormFieldsSidebar;
