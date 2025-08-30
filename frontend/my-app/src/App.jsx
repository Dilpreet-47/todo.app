import { useState } from "react";

const App = () => {

  const [task, settask] = useState("");

  const handleaddTask = async () => {
    if (!task.trim()) return;

    try{
      const response = await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({title: task}),
      });

      if(!response.ok){
        throw new Error("Failed to add task");
      }

      const data = await response.json();
      console.log("Task added:", data);
      settask("");
    }catch(error){
      console.error("Error adding task", error);
    }
  };

  return(
    <div className="flex h-screen w-screen p-3 bg-amber-100 flex-col gap-4">
      <h1 className="text-5xl">ToDo App</h1>
      <input className="flex bg-white w-screen border-blue-300 text-2xl"
       type="text" 
       value={task} 
       onChange={(e)=>settask(e.target.value)} 
       />
      <button className="flex p-3 justify-center items-center rounded-full h-10 w-30 border-black bg-amber-600" 
      onClick={handleaddTask}> Add task
      </button>
    </div>
  )
}

export default App;