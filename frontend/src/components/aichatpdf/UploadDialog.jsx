import React from "react";

const UploadDialog = ({
  open,
  onClose,
  onFileChange,
  onUpload,
  selectedFile,
  uploading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
      <div className="bg-white w-full max-w-72 md:max-w-md p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

        <div className="text-center">
          {selectedFile ? (
            <p className="text-gray-700 mb-4">{selectedFile.name}</p>
          ) : (
            <div className="bg-gray-100 rounded-md p-4">
              <label
                htmlFor="file-upload"
                className="block w-full py-2 px-4 bg-blue-600 text-white rounded cursor-pointer"
              >
                Choose PDF
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={onFileChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">Max file size: 10MB</p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onUpload}
            disabled={!selectedFile || uploading}
            className={`px-4 py-2 rounded text-white transition flex items-center justify-center gap-2 ${
              selectedFile && !uploading
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            {uploading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDialog;
