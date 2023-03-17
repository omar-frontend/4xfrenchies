import express from 'express'
import { pet, id } from '../controllers/pets.js'
// import { login } from '../controllers/auth.js'

const router = express.Router()

router.get("/", pet)
router.get("/:id", id)



export default router
