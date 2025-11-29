import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";

const TasksList = ({ tasks, id }) => {
  return (
    <div className="tasks">
      {/* SortableContext needs an array of IDs to know the order */}
      <SortableContext 
        id={id} 
        items={tasks.map(t => t._id)} 
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <SortableTask key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default TasksList;