import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = taskName.trim();

    if (!name) {
      return;
    }

    onAddTask(name);
    setTaskName("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nhập tên công việc........"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <button type="submit">
        Thêm
      </button>
    </form>
  );
}

export default TaskForm;
