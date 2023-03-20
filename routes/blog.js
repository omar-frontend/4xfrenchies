import express from 'express'
import { addPost, deletePost, id, post, updatePost } from '../controllers/blog.js'

const router = express.Router()

router.get("/", post)
router.get("/:id", id)

router.post("/add", addPost)
router.put("/update/:id", updatePost)
router.delete("/delete/:id", deletePost)

export default router
