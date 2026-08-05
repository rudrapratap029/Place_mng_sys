import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function PlacementChart() {
  const data = [
    { month: "Jan", placements: 12 },
    { month: "Feb", placements: 20 },
    { month: "Mar", placements: 18 },
    { month: "Apr", placements: 25 },
    { month: "May", placements: 32 },
    { month: "Jun", placements: 28 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Monthly Placements
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="placements"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default PlacementChart;