import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { useParams } from "react-router-dom";
import EditTask from "./EditTask";

export default function TaskCard() {
  const { state, dispatch } = useContext(TaskContext);
  const { projectId } = useParams();
  const data = state.data[projectId];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleModal = (task) => {
    setIsOpen(!isOpen);
    setSelectedTask(task);
  };

  const taskList =
    data &&
    data.map((item) => {
      return (
        <div
          key={item._id}
          className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {item?.title}
          </h4>
          <p className="text-gray-600 text-sm mb-3">{item?.description}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">
              Due:{" "}
              {new Date(item.dueDate).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
              {item?.status}
            </span>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => toggleModal(item)}
              className="text-indigo-600 hover:underline"
            >
              Edit
            </button>
            <button className="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
      );
    });

  console.log(state);

  return (
    <>
      {taskList}
      {isOpen && <EditTask setIsOpen={setIsOpen} selectedTask={selectedTask} />}
    </>
  );
}
