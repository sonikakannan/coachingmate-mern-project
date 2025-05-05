import mongoose from 'mongoose';

const PdfSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  chunks: {
    type: [String], // Array of strings to store text chunks
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Pdf = mongoose.model('Pdf', PdfSchema);

export default Pdf;