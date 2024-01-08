import React from "react";

const TaskForm = () => {

    return (
        <form className="task-form">
            <input
                type="text"
                placeholder="Add a Task"
                name="name"
            />
            <button type="submit">Add</button>
        </form>
    );
};
export default TaskForm;