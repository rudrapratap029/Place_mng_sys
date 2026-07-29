import { useEffect, useState } from "react";
import api from "../../services/api";
import StudentTable from "../../components/students/StudentTable";
import StudentForm from "../../components/students/StudentForm";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Edit
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const response = await api.get(
        `/api/students?search=${search}&page=${page}&limit=5`
      );

      setStudents(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed to fetch students"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/api/students/${id}`);

      alert(response.data.message);

      fetchStudents();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete student"
      );
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Students
        </h1>

        <button
          onClick={() => {
            setSelectedStudent(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Student
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Student Table */}
      <StudentTable
        students={students}
        loading={loading}
        setShowModal={setShowModal}
        setSelectedStudent={setSelectedStudent}
        deleteStudent={deleteStudent}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedStudent ? "Edit Student" : "Add Student"}
              </h2>

              <button
                onClick={() => {
                  setSelectedStudent(null);
                  setShowModal(false);
                }}
                className="text-red-500 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <StudentForm
              fetchStudents={fetchStudents}
              setShowModal={setShowModal}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;