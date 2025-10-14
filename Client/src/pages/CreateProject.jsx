import { useContext, useState } from "react";
import { ObjectId } from "bson";
import { ProjectContext } from "../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();

  const initialState = {
    title: "",
    description: "",
  };
  const [project, setProject] = useState(initialState);

  const { dispatch } = useContext(ProjectContext);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProject((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createNewProject = async (newProject) => {
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch("http://localhost:8000/api/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        throw new Error(`Request failed: error creating project ${res.status}`);
      }

      const data = await res.json();

      dispatch({ type: "CREATE_DATA", payload: data?.data?.project });
      setProject(initialState);

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...project,
      userId: new ObjectId().toString(),
    };
    createNewProject(newProject);
  };
  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Create New Project
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
            value={project.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}
