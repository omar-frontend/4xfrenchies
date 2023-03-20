import express from 'express'
import { pet, id, addPet, updatePet, deletePet } from '../controllers/pets.js'
// import { login } from '../controllers/auth.js'

const router = express.Router()

router.get("/", pet)
router.get("/:id", id)

router.post("/add", addPet)
router.put("/update/:id", updatePet)
router.delete("/delete/:id", deletePet)

export default router
