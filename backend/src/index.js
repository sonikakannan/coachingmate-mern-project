import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import {connectDB} from './config/db.js'
import generateTopicsRoute from './routes/course.route.js'
import stripeRoutes from './routes/stripe.route.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://coachingmate-frontend.onrender.com",
    credentials: true
}))



const PORT= process.env.PORT||5001


app.use("/api/auth", authRoutes)
app.use("/api/generate", generateTopicsRoute)
app.use("/api/stripe", stripeRoutes);

app.get('/', (req, res) => {
  res.send('API is working!');
});


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    connectDB()
})
