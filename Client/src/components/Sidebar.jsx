export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r h-screen p-5 fixed top-0 left-0 pt-20">
      <ul className="space-y-3">
        <li>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-100 text-gray-800 font-medium">
            Dashboard
          </button>
        </li>
        <li>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-100 text-gray-800 font-medium">
            My Projects
          </button>
        </li>
        <li>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-100 text-gray-800 font-medium">
            Create Project
          </button>
        </li>
      </ul>
    </aside>
  );
}
