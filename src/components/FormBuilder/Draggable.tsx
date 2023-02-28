import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface IDraggableProps {
  children: React.ReactNode;
  id: string | number;
  // attributes
  role?: string;
  roleDescription?: string;
  tabIndex?: number;
  //------------------
  data?: Record<string, any>;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Draggable = ({
  children,
  id,
  role,
  roleDescription,
  tabIndex,
  data,
  disabled = false,
  style,
}: IDraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
    disabled,
  });
  const containerStyle = {
    transform: CSS.Translate.toString(transform),
    cursor: "move",
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      style={containerStyle}
      {...listeners}
      {...attributes}
      {...{ role, "aria-roledescription": roleDescription, tabIndex }}
    >
      {children}
    </div>
  );
};

export default Draggable;
