import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import axios from 'axios';
import pdfParse from 'pdf-parse';
import Pdf from '../models/pdfUpload.model.js';
import PdfChunk from '../models/pdfChunk.model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pdf_uploads',
    resource_type: 'raw',
    format: 'pdf',
  },
});

export const upload = multer({ storage });

// Upload + parse PDF
export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const pdfUrl = req.file.path;

    // Download and parse
    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
    const dataBuffer = Buffer.from(response.data, 'binary');
    const data = await pdfParse(dataBuffer);
    const fullText = data.text;

    // Split into chunks
    const chunkSize = 1000;
    const chunks = [];
    for (let i = 0; i < fullText.length; i += chunkSize) {
      chunks.push(fullText.slice(i, i + chunkSize));
    }

    // Save PDF
    const pdf = new Pdf({ url: pdfUrl });
    const savedPdf = await pdf.save();

    // Save chunks
    const chunkDocs = chunks.map((chunk) => ({
      pdfId: savedPdf._id,
      text: chunk,
    }));
    await PdfChunk.insertMany(chunkDocs);

    res.status(200).json({
      success: true,
      url: pdfUrl,
      pdfId: savedPdf._id,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'File upload failed', error: error.message });
  }
};

// List all PDFs
export const getPdfList = async (req, res) => {
  try {
    const pdfs = await Pdf.find().select('_id url createdAt');
    const list = pdfs.map((pdf) => ({
      id: pdf._id,
      name: `PDF - ${pdf._id.toString().slice(-5)}`, // Or store real name if needed
    }));
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching PDF list:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch PDF list' });
  }
};

// Get single PDF URL
export const getPdfById = async (req, res) => {
  try {
    const { pdfId } = req.params;
    const pdf = await Pdf.findById(pdfId);
    if (!pdf) {
      return res.status(404).json({ success: false, message: 'PDF not found' });
    }
    res.status(200).json({ url: pdf.url });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).json({ success: false, message: 'Failed to get PDF' });
  }
};

// Ask Question
export const askQuestion = async (req, res) => {
  try {
    const { pdfId, question } = req.body;
    if (!pdfId || !question) {
      return res.status(400).json({ success: false, message: 'Missing pdfId or question' });
    }

    const chunks = await PdfChunk.find({ pdfId });
    if (!chunks.length) {
      return res.status(404).json({ success: false, message: 'No chunks found' });
    }

    const combinedText = chunks.map(c => c.text).join('\n');
    const prompt = `Based on the following document, answer the question.\n\nDocument:\n${combinedText}\n\nQuestion: ${question}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.status(200).json({ success: true, answer });
  } catch (error) {
    console.error('Error in askQuestion:', error);
    res.status(500).json({ success: false, message: 'Failed to answer question', error: error.message });
  }
};
