function RecentApplications() {
  const applications = [
    {
      student: "Rahul Sharma",
      company: "TCS",
      status: "Selected",
    },
    {
      student: "Priya Singh",
      company: "Infosys",
      status: "Applied",
    },
    {
      student: "Aman Verma",
      company: "Wipro",
      status: "Rejected",
    },
    {
      student: "Sneha Gupta",
      company: "Accenture",
      status: "Selected",
    },
    {
      student: "Rohit Kumar",
      company: "Capgemini",
      status: "Applied",
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl shadow-xl mx-8 mb-8 overflow-hidden"
      data-aos="fade-up"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Recent Applications
          </h2>

          <p className="text-gray-500 mt-1">
            Latest placement activities
          </p>

        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
          View All
        </button>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-6 py-4">
                Student
              </th>

              <th className="text-left px-6 py-4">
                Company
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map((item, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-6 py-5 font-medium">
                  {item.student}
                </td>

                <td className="px-6 py-5">
                  {item.company}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${
                      item.status === "Selected"
                        ? "bg-green-500"
                        : item.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentApplications;