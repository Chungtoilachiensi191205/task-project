import { useMemo, useState } from "react";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { useTheme } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { darkMode } = useTheme();

  const [tasks, setTasks] = useLocalStorage(
    "mini-task-manager",
    [
      {
        id: 1,
        name: "Học React Hooks",
        completed: false,
      },
      {
        id: 2,
        name: "Làm bài tập JavaScript",
        completed: true,
      },
      {
        id: 3,
        name: "Ôn tập useEffect",
        completed: false,
      },
      {
        id: 4,
        name: "Học Context API",
        completed: true,
      },
      {
        id: 5,
        name: "Làm Mini Task Manager",
        completed: false,
      },
    ]
  );

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Thêm task
  const addTask = (name) => {
    const newTask = {
      id: Date.now(),
      name,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  // Toggle task
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // Xóa task
  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  // Filter + Search
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.name
        .toLowerCase()
        .includes(search.toLowerCase());

      let matchFilter = true;

      if (filter === "completed") {
        matchFilter = task.completed;
      }

      if (filter === "incomplete") {
        matchFilter = !task.completed;
      }

      return matchSearch && matchFilter;
    });
  }, [tasks, filter, search]);

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const incomplete = total - completed;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">

        <Header />

        <TaskForm onAddTask={addTask} />

        <div className="toolbar">

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="incomplete">
              Chưa làm
            </option>
            <option value="completed">
              Hoàn thành
            </option>
          </select>

          <input
            type="text"
            placeholder="Tìm kiếm..........."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="statistics">
          <span>
            Tổng: {total}
          </span>

          <span>|</span>

          <span>
            Chưa làm: {incomplete}
          </span>

          <span>|</span>

          <span>
            Hoàn thành: {completed}
          </span>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

      </div>
    </div>
  );
}

export default App;
