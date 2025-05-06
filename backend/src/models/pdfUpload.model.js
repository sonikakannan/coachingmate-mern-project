import mongoose from 'mongoose';

const PdfSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  chunks: {
    type: [String],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});


const Pdf = mongoose.model('Pdf', PdfSchema);

export default Pdf;