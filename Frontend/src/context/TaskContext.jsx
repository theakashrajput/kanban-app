import { createContext, useState } from "react";

export const TaskContext = createContext(null);

const TaskProvider = (props) => {
  const [task, setTask] = useState([
    { _id: 1, title: "Task 1", description: "Task 1 desc", status: "ToDo" },
    {
      _id: 2,
      title: "Task 2",
      description: "Task 2 desc",
      status: "InProgress",
    },
    { _id: 3, title: "Task 3", description: "Task 3 desc", status: "ToDo" },
    { _id: 4, title: "Task 4", description: "Task 4 desc", status: "Done" },
    {
      _id: 5,
      title: "Task 5",
      description: "Task 5 desc",
      status: "InProgress",
    },
  ]);

  return (
    <TaskContext.Provider
      value={{
        tasks: [...task],
        setTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
