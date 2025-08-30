import { useState, useEffect } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]); // 👈 store all tasks
// Fetch tasks when app loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/todo");
        const data = await response.json();     
        setTasks(data); // set fetched tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }

    };
    fetchTasks();
  }, []);

  // Add a new task
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

      // Add new task to state so UI updates immediately
      setTasks([...tasks, newTask]);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen p-3 bg-amber-100 flex-col gap-4">
      <h1 className="text-5xl">ToDo App</h1>

      {/* Input */}
      <input
        className="flex bg-white border border-blue-300 text-2xl p-2"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      {/* Add Button */}
      <button
        className="p-3 rounded-full border-black bg-amber-600 w-32"
        onClick={handleAddTask}
      >
        Add task
      </button>

      {/* Show Tasks */}
      <div className="flex flex-col gap-2 mt-4">
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks yet</p>
        ) : (
          tasks.map((t) => (
            <div
              key={t._id}
              className="p-2 bg-white rounded shadow flex items-center"
            >
              {t.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
