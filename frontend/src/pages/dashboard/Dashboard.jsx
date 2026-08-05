import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

import StatsCards from "../../components/dashboard/StatsCards";
import PlacementChart from "../../components/dashboard/PlacementChart";
import PlacementPieChart from "../../components/dashboard/PlacementPieChart";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalApplications: 0,
    totalSelectedApplications: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/api/dashboard/summary");

      setDashboard(response.data.data);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load dashboard"
      );
    }
  };

  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to Placement Management System
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards dashboard={dashboard} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <PlacementChart />

        <PlacementPieChart />

      </div>

    </div>
  );
}

export default Dashboard;