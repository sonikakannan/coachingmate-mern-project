import express from 'express';
import {
  askQuestion,
  upload,
  uploadPdf,
  getPdfList,
  getPdfById
} from '../controllers/pdfUpload.controller.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadPdf);
router.post('/ask-question', askQuestion);
router.get('/pdf-list', getPdfList);
router.get('/pdf/:pdfId', getPdfById);

export default router;
