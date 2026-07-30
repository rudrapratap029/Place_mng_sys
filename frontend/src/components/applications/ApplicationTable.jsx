function ApplicationTable({
  applications,
  loading,
  setShowModal,
  setSelectedApplication,
  deleteApplication,
}) {
  if (loading) {
    return (
      <div className="text-center text-lg font-semibold py-10">
        Loading Applications...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Student</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-8 text-gray-500"
              >
                No Applications Found
              </td>
            </tr>
          ) : (
            applications.map((application) => (
              <tr key={application._id}>
                <td className="px-4 py-3 border-b">
                  {application.student?.name}
                </td>

                <td className="px-4 py-3 border-b">
                  {application.company?.companyName}
                </td>

                <td className="px-4 py-3 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      application.status === "Selected"
                        ? "bg-green-600"
                        : application.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {application.status}
                  </span>
                </td>

                <td className="px-4 py-3 border-b text-center">
                  <button
                    onClick={() => {
                      setSelectedApplication(application);
                      setShowModal(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteApplication(application._id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;