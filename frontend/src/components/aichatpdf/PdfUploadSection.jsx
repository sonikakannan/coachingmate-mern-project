import React from 'react';

const PdfUploadSection = ({ onUploadClick, pdfUrl }) => {
  return (
    <div className="w-1/2 flex flex-col">
      <div className="p-4 flex justify-end border border-gray-300">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onUploadClick}
        >
          + Upload PDF
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            className="border border-gray-300 w-full h-full"
          />
        ) : (
          <div className="text-gray-500">PDF preview will appear here...</div>
        )}
      </div>
    </div>
  );
};

export default PdfUploadSection;