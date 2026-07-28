import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 flex-1 min-h-screen bg-gray-100">

        <Navbar />

        <main className="p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default MainLayout;