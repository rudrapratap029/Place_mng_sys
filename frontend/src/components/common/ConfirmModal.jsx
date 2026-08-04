function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[400px] p-6">

        <h2 className="text-2xl font-bold mb-3">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;