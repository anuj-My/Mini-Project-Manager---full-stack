import { useNavigate, useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskFilter from "../components/TaskFilter";
import { useContext, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { ProjectContext } from "../contexts/ProjectContext";

export default function ProjectDetails() {
  const { state, dispatch } = useContext(TaskContext);
  const { state: projectState, dispatch: projectDispatch } =
    useContext(ProjectContext);

  const navigate = useNavigate();
  const { projectId } = useParams();

  const getProjecById = async () => {
    try {
      projectDispatch({ type: "LOADING" });

      const res = await fetch(
        `http://localhost:8000/api/v1/projects/${projectId}`
      );

      if (!res.ok) {
        throw new Error(`Request Failed: error getting project ${res.status}`);
      }
      const data = await res.json();

      projectDispatch({
        type: "GET_PROJECT",
        payload: data.data.project,
      });
    } catch (err) {
      projectDispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    getProjecById();
  }, [projectId, projectDispatch]);

  const getTaskByProjectId = async () => {
    try {
      dispatch({ type: "LOADING" });

      const res = await fetch(
        `http://localhost:8000/api/v1/tasks/project/${projectId}`
      );

      if (!res.ok) {
        throw new Error(`Request Failed: error getting tasks ${res.status}`);
      }
      const data = await res.json();

      dispatch({
        type: "GET_DATA",
        payload: { projectId, tasks: data?.data?.tasks },
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    getTaskByProjectId();
  }, [projectId, dispatch]);

  const projectTasks = state.data[projectId] || [];
  console.log(projectState);
  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          {projectState?.currentProject?.title}
        </h2>
        <button
          onClick={() => navigate(`/projects/${projectId}/tasks/create`)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Task
        </button>
      </div>
      {projectTasks.length > 0 && <TaskFilter />}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <TaskCard data={projectTasks} />
      </div>
    </div>
  );
}
