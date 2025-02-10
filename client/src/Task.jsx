import React, { useEffect, useState } from "react";
import {  CheckCircle, Pencil, Plus, Search, Trash } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CreateTask,
  DeleteTaskById,
  GetAllTasks,
  UpdateTaskById,
} from "./Api/api.js";

function Task() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleTask = async () => {
    if (!input.trim()) return;

    if (taskId) {
      await handleUpdateTask({ _id: taskId, taskName: input, isDone: false });
    } else {
      await handleAddTask();
    }

    setInput("");
    setTaskId(null);
  };

  const handleAddTask = async () => {
    try {
      const { success, message } = await CreateTask({
        taskName: input,
        isDone: false,
      });
      toast[success ? "success" : "error"](message);
      fetchAllTasks();
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  const fetchAllTasks = async () => {
    try {
      const response = await GetAllTasks();
      setTasks(response.tasks);
      setCopyTasks(response.tasks);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  const handleUpdateTask = async (item) => {
    try {
      const { success, message } = await UpdateTaskById(item._id, item);
      toast[success ? "success" : "error"](message);
      fetchAllTasks();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      toast[success ? "success" : "error"](message);
      fetchAllTasks();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleCheckAndUncheck = async (item) => {
    try {
      const { success, message } = await UpdateTaskById(item._id, {
        taskName: item.taskName,
        isDone: !item.isDone,
      });
      toast[success ? "success" : "error"](message);
      fetchAllTasks();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setTasks(copyTasks.filter((item) => item.taskName.toLowerCase().includes(term)));
  };

  return (
   <div className="p-10">
     <div className="p-6 bg-gray-900/40 shadow-lg rounded-lg border border-gray-700 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>

      {/* Input Section */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-600 bg-gray-800 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Add a new task"
        />
        <button
          onClick={handleTask}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-600 bg-gray-800 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="text"
          placeholder="Search tasks..."
        />
      </div>

      {/* Task List */}
      <div className="space-y-3 overflow-y-auto h-[300px] overflow-x-hidden scroll-smooth snap-y snap-mandatory overscroll-contain border border-gray-700 rounded-lg p-3 bg-gray-800 ">

        {tasks.map((item) => (
          <div
            key={item?._id}
            className="flex justify-between items-center p-4 border bg-gray-900 border-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            <span className={item?.isDone ? "line-through text-gray-400" : "text-white"}>
              {item?.taskName}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCheckAndUncheck(item)}
                className=" text-gray-400 p-2 rounded-lg hover:bg-green-600 hover:text-gray-200 transition"
              >
               {
                item.isDone ? "X": <CheckCircle></CheckCircle>
               }
              </button>
              <button
                onClick={() => {
                  setTaskId(item?._id);
                  setInput(item?.taskName);
                }}
                className="hover:text-gray-200 text-gray-400 p-2 rounded-lg hover:bg-yellow-600 transition"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDeleteTask(item?._id)}
                className="hover:text-gray-200 text-gray-400 p-2 rounded-lg hover:bg-red-600 transition"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
}

export default Task;