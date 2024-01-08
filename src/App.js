import React from "react";
import env from "react-dotenv";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskList from "./components/TaskList";

console.log(env);
export const URL = env.SERVER_URL;

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
