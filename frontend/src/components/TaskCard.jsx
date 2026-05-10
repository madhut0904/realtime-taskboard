import API from "../api/axios";

const TaskCard = ({ task, fetchTasks }) => {
    const moveTask = async () => {
        let nextStatus = "Completed";

        if (task.status === "To Do") {
            nextStatus = "In Progress";
        }

        try {
            await API.put(`/tasks/${task._id}`, {
                status: nextStatus,
            });

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="task-card">
            <h4>{task.title}</h4>

            <p>Status: {task.status}</p>

            {task.status !== "Completed" && (
                <button onClick={moveTask}>
                    Move Task
                </button>
            )}
        </div>
    );
};

export default TaskCard;