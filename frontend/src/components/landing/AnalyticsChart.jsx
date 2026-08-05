function AnalyticsChart() {
  const data = [
    { day: "Mon", value: 75 },
    { day: "Tue", value: 95 },
    { day: "Wed", value: 60 },
    { day: "Thu", value: 85 },
    { day: "Fri", value: 100 },
    { day: "Sat", value: 70 },
    { day: "Sun", value: 90 },
  ];

  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-8 mx-8 mb-8"
      data-aos="fade-up"
    >
      {/* Heading */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Placement Analytics
          </h2>

          <p className="text-gray-500 mt-1">
            Weekly placement performance
          </p>
        </div>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          +18%
        </span>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between h-72 border-b border-l border-gray-300 px-4 pb-4">

        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1"
          >
            <div
              className="w-10 md:w-12 rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 hover:scale-110 transition-all duration-300"
              style={{
                height: `${item.value * 2}px`,
              }}
            ></div>

            <span className="mt-3 text-sm text-gray-600 font-medium">
              {item.day}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AnalyticsChart;