import express from 'express'
import { id, post } from '../controllers/blog.js'

const router = express.Router()

router.get("/", post)
router.get("/:id", id)

export default router
