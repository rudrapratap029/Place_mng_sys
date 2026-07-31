import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
function CompanyForm({
  fetchCompanies,
  setShowModal,
  selectedCompany,
  setSelectedCompany,
}) {
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    package: "",
    location: "",
    eligibilityCGPA: "",
    jobRole: "",
    lastDateToApply: "",
    openings: "",
    status: "Open",
  });

  useEffect(() => {
    if (selectedCompany) {
      setFormData({
        companyName: selectedCompany.companyName,
        description: selectedCompany.description,
        package: selectedCompany.package,
        location: selectedCompany.location,
        eligibilityCGPA: selectedCompany.eligibilityCGPA,
        jobRole: selectedCompany.jobRole,
        lastDateToApply:
          selectedCompany.lastDateToApply?.split("T")[0],
        openings: selectedCompany.openings,
        status: selectedCompany.status,
      });
    }
  }, [selectedCompany]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedCompany) {
        await api.put(
          `/api/companies/${selectedCompany._id}`,
          formData
        );

       toast.success("Company Updated Successfully");
      } else {
        await api.post("/api/companies", formData);

        toast.success("Company Added Successfully");
      }

      fetchCompanies();
      setShowModal(false);
      setSelectedCompany(null);

      setFormData({
        companyName: "",
        description: "",
        package: "",
        location: "",
        eligibilityCGPA: "",
        jobRole: "",
        lastDateToApply: "",
        openings: "",
        status: "Open",
      });
    } catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  toast.error(
  error.response?.data?.message ||
  "Something went wrong"
);
}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="number"
        name="package"
        placeholder="Package (LPA)"
        value={formData.package}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="number"
        step="0.1"
        name="eligibilityCGPA"
        placeholder="Eligibility CGPA"
        value={formData.eligibilityCGPA}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="text"
        name="jobRole"
        placeholder="Job Role"
        value={formData.jobRole}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="date"
        name="lastDateToApply"
        value={formData.lastDateToApply}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="number"
        name="openings"
        placeholder="Openings"
        value={formData.openings}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
      >
        {selectedCompany ? "Update Company" : "Add Company"}
      </button>
    </form>
  );
}

export default CompanyForm;