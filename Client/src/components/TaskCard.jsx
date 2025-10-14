export default function TaskCard({ data }) {
  return (
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
            <span className="text-gray-500">Due: {item?.dueDate}</span>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
              {item?.status}
            </span>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button className="text-indigo-600 hover:underline">Edit</button>
            <button className="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
      );
    })
  );
}
