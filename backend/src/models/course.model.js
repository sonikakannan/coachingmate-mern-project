// models/Course.js
import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  topic: String,
  explain: String,
  code: String,
  example: String
});

const chapterSchema = new mongoose.Schema({
  chapterName: String,
  content: [contentSchema]
});

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAns: String
});

const flashcardSchema = new mongoose.Schema({
  front: String,
  back: String
});

const qaSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const courseSchema = new mongoose.Schema({
  courseTitle: String,
  description: String,
  banner_image: String,
  category: String,
  chapters: [chapterSchema],
  quiz: [quizSchema],
  flashcards: [flashcardSchema],
  qa: [qaSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
