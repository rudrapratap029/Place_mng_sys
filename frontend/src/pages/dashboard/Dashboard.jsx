import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";

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

      // Store only dashboard data
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
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Students"
          value={dashboard.totalStudents}
          color="text-blue-600"
        />

        <Card
          title="Total Companies"
          value={dashboard.totalCompanies}
          color="text-green-600"
        />

        <Card
          title="Applications"
          value={dashboard.totalApplications}
          color="text-orange-600"
        />

        <Card
          title="Selected Students"
          value={dashboard.totalSelectedApplications}
          color="text-purple-600"
        />
      </div>
    </div>
  );
}

export default Dashboard;