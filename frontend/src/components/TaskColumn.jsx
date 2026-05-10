import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, fetchTasks }) => {
    return (
        <div className="column">
            <h3>{title}</h3>

            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    fetchTasks={fetchTasks}
                />
            ))}
        </div>
    );
};

export default TaskColumn;