import React, { useState, useEffect } from "react";
import UploadDialog from "../components/aichatpdf/UploadDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import pdfIcon from "../assets/images/pdf.png";

const AIChatPdfPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pdfList, setPdfList] = useState([]);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchPdfList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/pdf-list?userId=${userId}`
      );
      setPdfList(response.data);
    } catch (err) {
      console.error("Failed to fetch PDFs:", err);
    }
  };

  useEffect(() => {
    fetchPdfList();
  }, []);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);

    try {
      await axios.post("http://localhost:5001/api/upload", formData);
      setOpen(false);
      setSelectedFile(null);
      fetchPdfList();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen border-t border-gray-300 p-6">
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Your PDFs</h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded shadow"
          onClick={() => setOpen(true)}
        >
          + Upload PDF
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {pdfList.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            You haven't uploaded any PDFs yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pdfList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer p-4 flex flex-col items-center text-center hover:bg-indigo-50"
                onClick={() => navigate(`/aipdfpage/${item.id}`)}
              >
                <img src={pdfIcon} alt="PDF Icon" className="w-24 h-24 mb-3" />
                <h4 className="font-medium text-gray-800 truncate">
                  {item.name}
                </h4>
              </div>
            ))}
          </div>
        )}
      </div>

      <UploadDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedFile(null);
        }}
        onFileChange={handleFileChange}
        onDrag={handleDrag}
        onDrop={handleDrop}
        onUpload={handleUpload}
        dragActive={dragActive}
        selectedFile={selectedFile}
      />

      {uploading && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded shadow text-indigo-600">
          Uploading...
        </div>
      )}
    </div>
  );
};

export default AIChatPdfPage;
