import express from 'express'
import { generateCourse, generateTopics, getAllCourse, getCourseById, getUserCourses } from '../controllers/course.controller.js'

const router= express.Router()

router.post("/topics",generateTopics)
router.post("/course",generateCourse)
router.get("/all-course",getAllCourse)
router.get("/courses/:id", getCourseById);
router.get('/user-courses/:userId', getUserCourses);
export default router