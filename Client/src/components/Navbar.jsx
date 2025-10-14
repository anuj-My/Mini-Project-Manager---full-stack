import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          Mini Project Manager
        </h1>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/projects/create"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Create Project
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Signup
          </Link>

          {/* <button className="text-gray-700 hover:text-indigo-600 font-medium">
            Logout
          </button> */}
        </div>
      </div>
    </nav>
  );
}
