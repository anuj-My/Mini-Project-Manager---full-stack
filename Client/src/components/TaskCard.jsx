import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { useParams } from "react-router-dom";
import EditTask from "./EditTask";

export default function TaskCard() {
  const { state, dispatch } = useContext(TaskContext);
  const { projectId } = useParams();
  const data = state.data[projectId];

  const [isOpen, setIsOpen] = useState(false);

  // const editTask = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:8000/api/v1/tasks/${projectId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "json/application",
  //         },
  //         body: JSON.stringify(),
  //       }
  //     );
  //   } catch (err) {}
  // };

  const toggleModal = () => {
    setIsOpen(!isOpen);
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
              onClick={toggleModal}
              className="text-indigo-600 hover:underline"
            >
              Edit
            </button>
            <button className="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
      );
    });

  return (
    <>
      {taskList}
      {isOpen && <EditTask setIsOpen={setIsOpen} />}
    </>
  );
}
