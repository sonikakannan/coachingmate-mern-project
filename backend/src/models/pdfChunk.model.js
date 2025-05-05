import mongoose from 'mongoose';

const PdfChunkSchema = new mongoose.Schema({
  pdfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pdf',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PdfChunk = mongoose.model('PdfChunk', PdfChunkSchema);

export default PdfChunk;
