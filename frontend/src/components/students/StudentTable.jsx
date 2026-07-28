function StudentTable({
  students,
  loading,
  setShowModal,
  setSelectedStudent,
  deleteStudent,
}) {
  if (loading) {
    return (
      <div className="text-center text-lg font-semibold py-10">
        Loading Students...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Branch</th>
            <th className="px-6 py-4 text-left">CGPA</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-8 text-gray-500"
              >
                No Students Found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td className="px-6 py-4 border-b">
                  {student.name}
                </td>

                <td className="px-6 py-4 border-b">
                  {student.email}
                </td>

                <td className="px-6 py-4 border-b">
                  {student.branch}
                </td>

                <td className="px-6 py-4 border-b">
                  {student.cgpa}
                </td>

                <td className="px-6 py-4 border-b text-center">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowModal(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStudent(student._id)}
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

export default StudentTable;