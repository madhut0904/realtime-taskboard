import { useState } from "react";
import API from "../api/axios";

const AddTask = ({ fetchTasks }) => {
    const [title, setTitle] = useState("");

    const addTask = async () => {
        if (!title) return;

        try {
            await API.post("/tasks", {
                title,
                description: "",
                status: "To Do",
            });

            setTitle("");
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="add-task">
            <input
                type="text"
                placeholder="Enter task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={addTask}>Add Task</button>
        </div>
    );
};

export default AddTask;