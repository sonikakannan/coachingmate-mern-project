import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatSection from '../components/aichatpdf/ChatSession';
import axios from 'axios';

const AIChatPdfViewPage = () => {
  const { pdfId } = useParams();
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/pdf/${pdfId}`);
        setPdfUrl(response.data.url);
      } catch (err) {
        console.error('Failed to load PDF:', err);
      }
    };

    fetchPdf();
  }, [pdfId]);

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <ChatSection pdfId={pdfId} />
      <div className="w-1/2 border-l border-gray-300">
        {pdfUrl ? (
          <iframe src={pdfUrl} title="PDF Viewer" className="w-full h-full" />
        ) : (
          <div className="text-center p-4 text-gray-500">Loading PDF...</div>
        )}
      </div>
    </div>
  );
};

export default AIChatPdfViewPage;
