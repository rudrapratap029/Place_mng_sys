import Card from "../ui/Card";

function StatsCards({ dashboard }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

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
  );
}

export default StatsCards;