import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import { connectDB } from './config/db.js';
import generateTopicsRoute from './routes/course.route.js';
import stripeRoutes from './routes/stripe.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); 

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://coachingmate-frontend.onrender.com"
  ],
  credentials: true,
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/generate", generateTopicsRoute);
app.use("/api/stripe", stripeRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Health check route
app.get('/', (req, res) => {
  res.send('API is working!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
