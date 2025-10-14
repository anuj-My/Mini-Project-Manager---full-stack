export default function TaskFilter() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="">Sort by Due Date</option>
        <option value="asc">Oldest First</option>
        <option value="desc">Newest First</option>
      </select>
    </div>
  );
}
