import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function ApplicationForm({
  fetchApplications,
  setShowModal,
  selectedApplication,
  setSelectedApplication,
}) {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    company: "",
    status: "Applied",
  });

  useEffect(() => {
    fetchStudents();
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedApplication) {
      setFormData({
        student: selectedApplication.student?._id || "",
        company: selectedApplication.company?._id || "",
        status: selectedApplication.status || "Applied",
      });
    } else {
      setFormData({
        student: "",
        company: "",
        status: "Applied",
      });
    }
  }, [selectedApplication]);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/api/students");
      setStudents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/api/companies");
      setCompanies(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedApplication) {
        const response = await api.patch(
          `/api/applications/${selectedApplication._id}`,
          {
            status: formData.status,
          }
        );

        toast.success(response.data.message);
      } else {
        const response = await api.post("/api/applications", {
          student: formData.student,
          company: formData.company,
        });

        toast.success(response.data.message);
      }

      fetchApplications();
      setSelectedApplication(null);
      setShowModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block font-semibold mb-2">
          Student
        </label>

        <select
          name="student"
          value={formData.student}
          onChange={handleChange}
          disabled={selectedApplication}
          required
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Company
        </label>

        <select
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={selectedApplication}
          required
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Select Company</option>

          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="Applied">Applied</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => {
            setSelectedApplication(null);
            setShowModal(false);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          {selectedApplication ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;