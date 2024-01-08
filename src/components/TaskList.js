import React, { useEffect, useState } from "react";
import TaskPage from "./TaskPage";
import Task from "./Task";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(cTask);
  }, [tasks]);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Task name should not be empty");
    }

    try {
      await axios.post(`${URL}/api/tasks`, formData);
      setFormData({ ...formData, name: "" });
      getTasks();
      toast.success("Task added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = (task) => {
    setFormData({ name: task.name, completed: task.completed });
    setTaskId(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Please enter task name");
    }

    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      setTaskId("");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };

    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskPage
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks: </b>
            {tasks.length}
          </p>
          <p>
            <b>Total Tasks: </b>
            {completedTasks.length}
          </p>
        </div>
      )}
      <hr />
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task found, please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                index={index}
                task={task}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
