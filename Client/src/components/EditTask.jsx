import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";

const EditTask = ({ setIsOpen, selectedTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });

  const { state, dispatch } = useContext(TaskContext);

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        status: selectedTask.status || "",
        dueDate: selectedTask.dueDate
          ? new Date(selectedTask.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateTask = async () => {
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/tasks/${selectedTask._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            dueDate: new Date(formData.dueDate).toISOString(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update task");
      }

      console.log(data);

      dispatch({
        type: "UPDATE_DATA",
        payload: {
          updatedTask: data.data.task,
          projId: data.data.task.projectId,
        },
      });
      setIsOpen(false);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      setIsOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask();
  };

  console.log(state);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Edit Task
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData?.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-gray-700 dark:text-gray-300 mb-1"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-gray-700 dark:text-gray-300 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData?.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            >
              <option value="todo">To do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
