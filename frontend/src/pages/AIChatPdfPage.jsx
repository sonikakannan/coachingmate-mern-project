import React, { useState, useEffect } from 'react';
import UploadDialog from '../components/aichatpdf/UploadDialog';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AIChatPdfPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pdfList, setPdfList] = useState([]);

  const navigate = useNavigate();

  const fetchPdfList = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/pdf-list');
      setPdfList(response.data);
    } catch (err) {
      console.error('Failed to fetch PDFs:', err);
    }
  };

  useEffect(() => {
    fetchPdfList();
  }, []);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
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
    formData.append('file', selectedFile);

    try {
      const res = await axios.post('http://localhost:5001/api/upload', formData);
      setOpen(false);
      setSelectedFile(null);
      fetchPdfList(); // Refresh list
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setOpen(true)}
        >
          + Upload PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pdfList.length === 0 ? (
          <div className="text-gray-500">No PDFs uploaded yet.</div>
        ) : (
          pdfList.map((pdf) => (
            <div
              key={pdf.id}
              className="border p-4 rounded shadow cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/aipdfpage/${pdf.id}`)}
            >
              <h4 className="font-semibold">{pdf.name}</h4>
            </div>
          ))
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

      {uploading && <div className="text-center text-gray-500 mt-4">Uploading...</div>}
    </div>
  );
};

export default AIChatPdfPage;
