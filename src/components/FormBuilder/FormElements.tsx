import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";
import {
  Title,
  RadioButtonChecked,
  CheckBox,
  ArrowDropDownCircleOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";
import React from "react";
import {
  Grid,
  IconButton,
  Stack,
  Card,
  Tooltip,
  CardContent,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Draggable from "./Draggable";

const formElements = [
  { id: "text", label: "Text", icon: <Title /> },
  { id: "radio", label: "Radio", icon: <RadioButtonChecked /> },
  { id: "checkbox", label: "Checkbox", icon: <CheckBox /> },
  { id: "dropdown", label: "Dropdown", icon: <ArrowDropDownCircleOutlined /> },
  { id: "file-upload", label: "File Upload", icon: <FileUploadOutlined /> },
];

interface IFormElementsProps {
  activeId?: UniqueIdentifier | null;
}

const FormElements = ({ activeId }: IFormElementsProps) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <List>
        {formElements.map((element) => {
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
            <ListItemIcon>{formElements.find((e) => e.id === activeId)?.icon}</ListItemIcon>
            <ListItemText>{formElements.find((e) => e.id === activeId)?.label}</ListItemText>
          </ListItem>
        ) : null}
      </DragOverlay>
    </React.Fragment>
  );
};

export default FormElements;
