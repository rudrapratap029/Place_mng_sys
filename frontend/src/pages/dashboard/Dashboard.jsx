import Card from "../../components/ui/Card";

function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card
          title="Total Students"
          value="0"
          color="text-blue-600"
        />

        <Card
          title="Total Companies"
          value="0"
          color="text-green-600"
        />

        <Card
          title="Applications"
          value="0"
          color="text-orange-600"
        />

        <Card
          title="Selected Students"
          value="0"
          color="text-purple-600"
        />

      </div>

    </div>
  );
}

export default Dashboard;