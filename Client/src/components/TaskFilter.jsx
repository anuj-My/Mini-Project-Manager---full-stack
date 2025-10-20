import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function TaskFilter() {
  const [filter, setFilter] = useState({
    status: "",
    sort: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let params = {};
    if (filter.status) {
      params.status = filter.status;
    }
    if (filter.sort) {
      params.sort = filter.sort;
    }

    setSearchParams(params);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <select
          onChange={handleChange}
          name="status"
          value={filter.status}
          className="border rounded-lg  mr-3 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          onChange={handleChange}
          name="sort"
          value={filter.sort}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sort by Due Date</option>
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>
        <button
          type="submit"
          className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Apply
        </button>
      </form>
    </div>
  );
}
