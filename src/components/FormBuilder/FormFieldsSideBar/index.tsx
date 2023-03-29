import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";
import React from "react";
import {
  ListItemText,
  List,
  Drawer,
  Typography,
  Divider,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { FORM_ELEMENTS_LIST } from "../../../constants";
import { StyledFormFieldItem } from "./Styles";
import { Add, OpenWithOutlined } from "@mui/icons-material";

interface IFormFieldsProps {
  isOpen: boolean;
  activeId?: UniqueIdentifier | null;
  onDrawerClick: () => void;
  onFieldAdd: (id: string) => void;
}

const FormFieldsSidebar = ({ isOpen, activeId, onDrawerClick, onFieldAdd }: IFormFieldsProps) => {
  return (
    <Drawer
      open={isOpen}
      onClick={onDrawerClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
        if (e?.key === "Escape" || e?.code === "Escape") {
          onDrawerClick();
        }
      }}
      anchor={"left"}
      variant={isOpen ? "persistent" : "temporary"}
      PaperProps={{
        sx: {
          width: 220,
          ...(isOpen && { position: "relative" }),
        },
      }}
    >
      <Typography sx={{ height: 50, lineHeight: "50px" }} variant="overline" textAlign={"center"}>
        Form Fields
      </Typography>
      <Divider />
      <List disablePadding>
        {FORM_ELEMENTS_LIST.map((element) => {
          const { attributes, listeners, setNodeRef } = useDraggable({
            id: element.id,
          });
          return (
            <StyledFormFieldItem disablePadding key={element.id} ref={setNodeRef} {...attributes}>
              <ListItemIcon
                {...listeners}
                title="Drag to right"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OpenWithOutlined sx={{ height: 20, width: 20, opacity: 0.3 }} />
              </ListItemIcon>

              <ListItemText
                {...listeners}
                primary={element.label}
                secondary={element.description}
                secondaryTypographyProps={{ variant: "caption" }}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onFieldAdd(element.id);
                }}
              >
                <Add />
              </IconButton>
            </StyledFormFieldItem>
          );
        })}
      </List>
      <DragOverlay dropAnimation={null}>
        {activeId && activeId.toString().includes("ctrl_") ? (
          <StyledFormFieldItem disablePadding>
            <OpenWithOutlined sx={{ height: 25, width: 25, m: 1 }} />
            <ListItemText primary={FORM_ELEMENTS_LIST.find((e) => e.id === activeId)?.label} />
          </StyledFormFieldItem>
        ) : null}
      </DragOverlay>
    </Drawer>
  );
};

export default FormFieldsSidebar;
