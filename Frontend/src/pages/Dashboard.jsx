import { useContext, useState } from "react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { TaskContext } from "../context/taskContext";
import TasksList from "../components/tasksList";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const Dashboard = () => {
  const { tasks, setTask } = useContext(TaskContext);

  // Helper to find which container a task is in
  const findContainer = (id) => {
    if (tasks.find((t) => t._id === id)) {
      return tasks.find((t) => t._id === id).status;
    }
    return null;
  };

  // Sensors handle input (Mouse, Touch, Keyboard)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // LOGIC 1: Handle dragging OVER a column (Visually moving items)
  const handleDragOver = (event) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    // Find the container (status) of the active item and the over item
    const activeContainer = findContainer(active.id);
    // If over a container directly (empty column), use its ID, else find item's container
    const overContainer =
      overId === "ToDo" || overId === "InProgress" || overId === "Done"
        ? overId
        : findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // If we are dragging to a DIFFERENT column, update state immediately
    // so the user sees it happen
    setTask((prev) => {
      const activeItems = prev.filter((t) => t.status === activeContainer);
      const overItems = prev.filter((t) => t.status === overContainer);

      const activeIndex = prev.findIndex((t) => t._id === active.id);

      // Update the status of the moved task
      const newTasks = [...prev];
      newTasks[activeIndex].status = overContainer;

      return newTasks;
    });
  };

  // LOGIC 2: Handle Dropping (Reordering within same column)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    const activeContainer = findContainer(active.id);
    const overContainer =
      overId === "ToDo" || overId === "InProgress" || overId === "Done"
        ? overId
        : findContainer(overId);

    if (activeContainer === overContainer) {
      // Reordering logic using arrayMove
      const activeIndex = tasks.findIndex((t) => t._id === active.id);
      const overIndex = tasks.findIndex((t) => t._id === overId);

      if (activeIndex !== overIndex) {
        setTask((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
  };

  // Derived state (Filter tasks for columns)
  const todoTasks = tasks.filter((t) => t.status === "ToDo");
  const inProgressTasks = tasks.filter((t) => t.status === "InProgress");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  return (
    <section className="board">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div id="toDoTaskCol" className="task-column">
          <div className="heading">ToDo</div>
          {/* Pass ID to TasksList to identify the container */}
          <TasksList tasks={todoTasks} id="ToDo" />
        </div>

        <div id="inProgressTaskCol" className="task-column">
          <div className="heading">In progress</div>
          <TasksList tasks={inProgressTasks} id="InProgress" />
        </div>

        <div id="doneTaskCol" className="task-column">
          <div className="heading">Done</div>
          <TasksList tasks={doneTasks} id="Done" />
        </div>
      </DndContext>
    </section>
  );
};

export default Dashboard;
