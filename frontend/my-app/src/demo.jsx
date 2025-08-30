import { useEffect, useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch("http://localhost:5000/todo");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTodo();
  }, []);

  const handleAddTask = async () => {
    if (!task.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();
      // ✅ update UI immediately
      setTasks(prev => [...prev, newTask]); 
      setTask("");
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // ✅ remove from state using functional update + strict compare
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="flex h-screen w-screen p-3 bg-amber-100 flex-col gap-4">
      <h1 className="text-5xl">ToDo App</h1>

      <input
        className="flex bg-white w-screen border border-blue-300 text-2xl p-2 rounded"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task…"
      />

      <button
        className="flex p-3 justify-center items-center rounded-full h-10 w-32 border bg-amber-600 text-white"
        onClick={handleAddTask}
      >
        Add task
      </button>

      <h2 className="text-3xl">Viewable tasks</h2>

      <div className="flex flex-col gap-2 mt-2">
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks yet</p>
        ) : (
          tasks.map((t) => (
            <div
              key={t._id}
              className="flex items-center justify-between bg-amber-50 p-2 rounded"
            >
              <div className="flex items-center gap-2">
                {/* Checkbox is read-only for now */}
                <input type="checkbox" checked={t.completed} readOnly />
                <span className={t.completed ? "line-through text-gray-500" : ""}>
                  {t.title}
                </span>
              </div>

              <button
                className="bg-red-600 rounded px-3 py-1 text-white"
                onClick={() => handleDeleteTask(t._id)}  // ✅ correct handler
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
