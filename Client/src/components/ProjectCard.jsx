import { useNavigate, useParams } from "react-router-dom";

export default function ProjectCard({ data, loading }) {
  const navigate = useNavigate();
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
    data.map((item) => {
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
            <button className="text-sm text-gray-600 hover:text-red-500">
              Delete
            </button>
          </div>
        </div>
      );
    })
  );
}
