import React from "react";

const UploadDialog = ({
  open,
  onClose,
  onFileChange,
  onDrag,
  onDrop,
  onUpload,
  dragActive,
  selectedFile,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

        <div
          onDragEnter={onDrag}
          onDragOver={onDrag}
          onDragLeave={onDrag}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          {selectedFile ? (
            <p className="text-gray-700">{selectedFile.name}</p>
          ) : (
            <div className="bg-gray-100 rounded-md p-4">
              <input
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                className="block w-full text-sm text-gray-700"
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
            disabled={!selectedFile}
            className={`px-4 py-2 rounded text-white transition ${
              selectedFile
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDialog;
