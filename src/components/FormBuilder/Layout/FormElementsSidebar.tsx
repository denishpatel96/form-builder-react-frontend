import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";

import React from "react";
import { ListItem, ListItemIcon, ListItemText, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Draggable from "../../Reusable/Draggable";
import { FORM_ELEMENTS_LIST } from "../../../constants";

interface IFormElementsProps {
  activeId?: UniqueIdentifier | null;
}

const FormElementsSidebar = ({ activeId }: IFormElementsProps) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <List>
        {FORM_ELEMENTS_LIST.map((element) => {
          return (
            <Draggable style={{ width: "100%" }} key={element.id} id={element.id}>
              <ListItem divider>
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText>{element.label}</ListItemText>
              </ListItem>
            </Draggable>
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
