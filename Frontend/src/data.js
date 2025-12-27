export const INITIAL_DATA = {
  // 1. Workspaces: The highest level
  workspaces: {
    "ws-1": {
      id: "ws-1",
      title: "Personal Projects",
      boardIds: ["board-1", "board-2"],
    },
    "ws-2": {
      id: "ws-2",
      title: "University BCA",
      boardIds: ["board-3"],
    },
  },

  // 2. Boards: Belong to Workspaces
  boards: {
    "board-1": {
      id: "board-1",
      title: "MERN Portfolio App",
      icon: "👩🏻‍💻",
      taskCount: 3,
      columnIds: ["col-1", "col-2", "col-3"],
    },
    "board-2": {
      id: "board-2",
      title: "Daily Chores",
      icon: "🔴",
      taskCount: 0,
      columnIds: [],
    },
    "board-3": {
      id: "board-3",
      title: "Kanban App",
      icon: "☑️",
      taskCount: 0,
      columnIds: [],
    },
  },

  // 3. Columns: Belong to Boards
  columns: {
    "col-1": {
      id: "col-1",
      title: "To Do",
      taskIds: ["task-1", "task-2"],
    },
    "col-2": {
      id: "col-2",
      title: "In Progress",
      taskIds: ["task-3"],
    },
    "col-3": {
      id: "col-3",
      title: "Done",
      taskIds: [],
    },
  },

  // 4. Tasks: The smallest unit
  tasks: {
    "task-1": { id: "task-1", label: "Development", content: "Set up React Context", priority: "High", date: "28 Dec" },
    "task-2": { id: "task-2", label: "Development", content: "Design Sidebar UI", priority: "Medium", date: "1 Jan" },
    "task-3": { id: "task-3", label: "Development", content: "Create Dummy Data", priority: "Low", date: "15 Jan" },
  },
};