import { useContext, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { ProjectContext } from "../contexts/ProjectContext";

export default function Dashboard() {
  const { dispatch } = useContext(ProjectContext);

  const getAllProjects = async () => {
    dispatch({ type: "LOADING" });

    try {
      const res = await fetch("http://localhost:8000/api/v1/projects");

      if (!res.ok) {
        throw new Error(`Request failed: error getting project ${res.status}`);
      }

      const data = await res.json();

      dispatch({ type: "GET_DATA", payload: data.data.projects });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="pt-20 bg-gray-100 min-h-screen p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard />
      </div>
    </div>
  );
}
