import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";

import React from "react";
import { ListItem, ListItemIcon, ListItemText, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FORM_ELEMENTS_LIST } from "../../../constants";
import { CSS } from "@dnd-kit/utilities";
import { StyledFormElementItem, StyledListItem } from "../FormElements/Common/Styles";

interface IFormElementsProps {
  activeId?: UniqueIdentifier | null;
}

const FormElementsSidebar = ({ activeId }: IFormElementsProps) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <List disablePadding>
        {FORM_ELEMENTS_LIST.map((element) => {
          const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: element.id,
          });
          return (
            <StyledFormElementItem key={element.id} ref={setNodeRef} {...listeners} {...attributes}>
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText>{element.label}</ListItemText>
            </StyledFormElementItem>
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
    </React.Fragment>
  );
};

export default FormElementsSidebar;
