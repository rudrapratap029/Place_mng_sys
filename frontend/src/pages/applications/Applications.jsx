import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

import ApplicationTable from "../../components/applications/ApplicationTable";
import ApplicationForm from "../../components/applications/ApplicationForm";
import ConfirmModal from "../../components/common/ConfirmModal";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add/Edit Modal
  const [showModal, setShowModal] = useState(false);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteApplicationId, setDeleteApplicationId] =
    useState(null);

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Edit
  const [selectedApplication, setSelectedApplication] =
    useState(null);

  useEffect(() => {
    fetchApplications();
  }, [page, search]);

  // Fetch Applications
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/api/applications?search=${search}&page=${page}&limit=5`
      );

      setApplications(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete Application
  const deleteApplication = async () => {
    try {
      const response = await api.delete(
        `/api/applications/${deleteApplicationId}`
      );

      toast.success(response.data.message);

      fetchApplications();

      setShowDeleteModal(false);
      setDeleteApplicationId(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete application"
      );
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Applications
        </h1>

        <button
          onClick={() => {
            setSelectedApplication(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Application
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Application..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <ApplicationTable
        applications={applications}
        loading={loading}
        setShowModal={setShowModal}
        setSelectedApplication={setSelectedApplication}
        deleteApplication={(id) => {
          setDeleteApplicationId(id);
          setShowDeleteModal(true);
        }}
      />

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedApplication
                  ? "Edit Application"
                  : "Add Application"}
              </h2>

              <button
                onClick={() => {
                  setSelectedApplication(null);
                  setShowModal(false);
                }}
                className="text-red-500 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <ApplicationForm
              fetchApplications={fetchApplications}
              setShowModal={setShowModal}
              selectedApplication={selectedApplication}
              setSelectedApplication={setSelectedApplication}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmModal
          title="Delete Application"
          message="Are you sure you want to delete this application?"
          onCancel={() => {
            setShowDeleteModal(false);
            setDeleteApplicationId(null);
          }}
          onConfirm={deleteApplication}
        />
      )}
    </div>
  );
}

export default Applications;