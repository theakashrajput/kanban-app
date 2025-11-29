import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableTask = ({ task }) => {
  // dnd-kit hook to make this item draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id }); // Use task.id or task._id

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none", // Recommended for touch devices
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task" // Your existing class
    >
      <div className="task-head">
        <h3>{task.title}</h3>
        {/* Note: In dnd-kit, buttons inside draggable items need special handling, 
            but for now, we leave it as is */}
        <button className="delete-btn">Delete</button>
      </div>
      <div className="task-body">
        <p>{task.description}</p>
      </div>
    </div>
  );
};