import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import CompanyTable from "../../components/companies/CompanyTable";
import CompanyForm from "../../components/companies/CompanyForm";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Edit
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, [page, search]);

  // Fetch Companies
  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/api/companies?search=${search}&page=${page}&limit=5`
      );

      setCompanies(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch companies"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete Company
  const deleteCompany = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(
        `/api/companies/${id}`
      );

      toast.success(response.data.message);

      fetchCompanies();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete company"
      );
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Companies
        </h1>

        <button
          onClick={() => {
            setSelectedCompany(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Company
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Company..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Company Table */}
      <CompanyTable
        companies={companies}
        loading={loading}
        setShowModal={setShowModal}
        setSelectedCompany={setSelectedCompany}
        deleteCompany={deleteCompany}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCompany
                  ? "Edit Company"
                  : "Add Company"}
              </h2>

              <button
                onClick={() => {
                  setSelectedCompany(null);
                  setShowModal(false);
                }}
                className="text-red-500 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <CompanyForm
              fetchCompanies={fetchCompanies}
              setShowModal={setShowModal}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Companies;