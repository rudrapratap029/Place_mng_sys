import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
function StudentForm({
  fetchStudents,
  setShowModal,
  selectedStudent,
  setSelectedStudent,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    cgpa: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        email: selectedStudent.email,
        branch: selectedStudent.branch,
        cgpa: selectedStudent.cgpa,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        branch: "",
        cgpa: "",
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let response;

      if (selectedStudent) {
        response = await api.put(
          `/api/students/${selectedStudent._id}`,
          formData
        );
      } else {
        response = await api.post(
          "/api/students",
          formData
        );
      }
      toast.success(response.data.message);

      fetchStudents();

      setSelectedStudent(null);

      setShowModal(false);
    }catch (error) {
  console.log("Full Error:", error);
  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);

 toast.error(
  error.response?.data?.message || "Operation Failed"
);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block font-semibold mb-1">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">
          Branch
        </label>

        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          placeholder="Enter Branch"
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">
          CGPA
        </label>

        <input
          type="number"
          step="0.1"
          name="cgpa"
          value={formData.cgpa}
          onChange={handleChange}
          placeholder="Enter CGPA"
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            setSelectedStudent(null);
            setShowModal(false);
          }}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          {loading
            ? selectedStudent
              ? "Updating..."
              : "Adding..."
            : selectedStudent
            ? "Update Student"
            : "Add Student"}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;