import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import TaskProvider from "./context/taskContext.jsx";
createRoot(document.getElementById("root")).render(
  <TaskProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TaskProvider>
);
