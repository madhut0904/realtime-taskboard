import { useEffect, useState } from "react";

import API from "../api/axios";
import socket from "../socket";

import AddTask from "./AddTask";
import TaskColumn from "./TaskColumn";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks");
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();

        socket.on("taskCreated", () => {
            fetchTasks();
        });

        socket.on("taskUpdated", () => {
            fetchTasks();
        });

        return () => {
            socket.off("taskCreated");
            socket.off("taskUpdated");
        };
    }, []);

    return (
        <div>
            <AddTask fetchTasks={fetchTasks} />

            <div className="board">
                <TaskColumn
                    title="To Do"
                    tasks={tasks.filter(
                        (task) => task.status === "To Do"
                    )}
                    fetchTasks={fetchTasks}
                />

                <TaskColumn
                    title="In Progress"
                    tasks={tasks.filter(
                        (task) => task.status === "In Progress"
                    )}
                    fetchTasks={fetchTasks}
                />

                <TaskColumn
                    title="Completed"
                    tasks={tasks.filter(
                        (task) => task.status === "Completed"
                    )}
                    fetchTasks={fetchTasks}
                />
            </div>
        </div>
    );
};

export default TaskBoard;