import React from "react";
import { useSortable, defaultAnimateLayoutChanges, AnimateLayoutChanges } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";
import { CSS } from "@dnd-kit/utilities";

interface ISortableProps {
  children: React.ReactNode;
  id: string | number;
  data?: Record<string, any>;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Sortable = ({ children, id, data, disabled, style }: ISortableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data,
    disabled,
    transition: {
      duration: 600, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const containerStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...style,
  };

  return (
    <div ref={setNodeRef} style={containerStyle} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default Sortable;
