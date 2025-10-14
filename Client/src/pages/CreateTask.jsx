import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateTask() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(TaskContext);
  const [success, setSuccess] = useState(false);

  const initialState = {
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  };
  const [task, setTask] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createNewTask = async (newTask) => {
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch("http://localhost:8000/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) {
        throw new Error(`Request failed: error creating task ${res.status}`);
      }

      const data = await res.json();

      dispatch({
        type: "CREATE_DATA",
        payload: { task: data?.data?.task, projectId },
      });
      setTask(initialState);

      setSuccess(true);

      setTimeout(() => {
        navigate(`/projects/${projectId}`);
      }, 1000);
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...task,
      projectId,
    };
    createNewTask(newTask);
  };
  console.log(state);
  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Create New Task
        </h2>

        {success && (
          <p className="text-green-600 text-center mb-4">
            Task created successfully! Redirecting...
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-lg px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>

          <select
            name="status"
            onChange={handleChange}
            value={task.status}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <input
            onChange={handleChange}
            value={task.dueDate}
            name="dueDate"
            type="date"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
