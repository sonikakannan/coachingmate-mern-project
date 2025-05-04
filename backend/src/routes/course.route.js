import express from 'express'
import { generateCourse, generateTopics, getAllCourse, getCourseById } from '../controllers/course.controller.js'

const router= express.Router()

router.post("/topics",generateTopics)
router.post("/course",generateCourse)
router.get("/all-course",getAllCourse)
router.get("/courses/:id", getCourseById);
export default router