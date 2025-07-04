import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './config/db.js';
import generateTopicsRoute from './routes/course.route.js';
import stripeRoutes from './routes/stripe.route.js';
import uploadRoute from './routes/pdfUploade.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

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
app.use('/api', uploadRoute);

// Health check route
app.get('/', (req, res) => {
  res.send('API is working!');
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
