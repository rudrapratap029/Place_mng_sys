import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PlacementPieChart() {
  const data = [
    { name: "Selected", value: 42 },
    { name: "Applied", value: 35 },
    { name: "Rejected", value: 23 },
  ];

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#ef4444",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Application Status
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PlacementPieChart;