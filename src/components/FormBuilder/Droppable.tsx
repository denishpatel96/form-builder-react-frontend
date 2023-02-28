import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { useTheme } from "@mui/material/styles";

interface IDroppableProps {
  children: React.ReactNode;
  id: string | number;
  style?: React.CSSProperties | undefined;
  data?: Record<string, any>;
  disabled?: boolean;
}

const Droppable = ({ children, style, id, data, disabled = false }: IDroppableProps) => {
  const { setNodeRef, isOver } = useDroppable({ id, data, disabled });
  const theme = useTheme();

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, backgroundColor: isOver ? theme.palette.action.hover : "" }}
    >
      {children}
    </div>
  );
};

export default Droppable;
