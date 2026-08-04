import Loading from "../common/Loader";

function CompanyTable({
  companies,
  loading,
  setShowModal,
  setSelectedCompany,
  deleteCompany,
}) {
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Package</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">CGPA</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center py-8 text-gray-500"
              >
                No Companies Found
              </td>
            </tr>
          ) : (
            companies.map((company) => (
              <tr key={company._id}>
                <td className="px-4 py-3 border-b">
                  {company.companyName}
                </td>

                <td className="px-4 py-3 border-b">
                  {company.jobRole}
                </td>

                <td className="px-4 py-3 border-b">
                  ₹ {company.package} LPA
                </td>

                <td className="px-4 py-3 border-b">
                  {company.location}
                </td>

                <td className="px-4 py-3 border-b">
                  {company.eligibilityCGPA}
                </td>

                <td className="px-4 py-3 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      company.status === "Open"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {company.status}
                  </span>
                </td>

                <td className="px-4 py-3 border-b text-center">
                  <button
                    onClick={() => {
                      setSelectedCompany(company);
                      setShowModal(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCompany(company._id)}
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

export default CompanyTable;