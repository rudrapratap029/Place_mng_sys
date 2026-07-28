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

  // Edit
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/api/students");
      setStudents(response.data.data);
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
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Student Table */}
      <StudentTable
  students={students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.branch.toLowerCase().includes(search.toLowerCase())
  )}
  loading={loading}
  setShowModal={setShowModal}
  setSelectedStudent={setSelectedStudent}
  fetchStudents={fetchStudents}
/>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedStudent
                  ? "Edit Student"
                  : "Add Student"}
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