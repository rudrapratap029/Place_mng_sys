import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-400">
          PMS Admin
        </h1>
      </div>

      <nav className="mt-6">

        <Link
          to="/dashboard"
          className="block px-6 py-3 hover:bg-slate-700 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/students"
          className="block px-6 py-3 hover:bg-slate-700 transition"
        >
          Students
        </Link>

        <Link
          to="/companies"
          className="block px-6 py-3 hover:bg-slate-700 transition"
        >
          Companies
        </Link>

        <Link
          to="/applications"
          className="block px-6 py-3 hover:bg-slate-700 transition"
        >
          Applications
        </Link>

      </nav>
    </aside>
  );
}

export default Sidebar;