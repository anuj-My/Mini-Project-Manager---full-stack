import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../contexts/ProjectContext";

import { toast } from "react-toastify";

export default function ProjectCard() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(ProjectContext);
  const { data, loading } = state;

  const handleDelete = async (id) => {
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch(`http://localhost:8000/api/v1/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error deleting the projects try again.");
      }

      await res.json();
      dispatch({ type: "DELETE_PROJECT", payload: id });
      toast(`The Project has been deleted`);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-gray-200 animate-pulse h-40 rounded-xl shadow-md"
          ></div>
        ))}
      </div>
    );
  }

  return (
    data &&
    data?.map((item) => {
      return (
        <div
          key={item?._id}
          className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold text-indigo-600 mb-2">
            {item?.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{item?.description}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(`/projects/${item._id}`)}
              className="text-sm text-indigo-600 hover:underline"
            >
              View Tasks
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="text-sm text-gray-600 hover:text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      );
    })
  );
}
