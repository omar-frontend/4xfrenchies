import express from 'express'
import { addQuestion, getQuestion } from '../controllers/questions.js'

const router = express.Router()

router.get("/", getQuestion)
router.post("/add", addQuestion)

export default router