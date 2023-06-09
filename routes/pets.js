import express from 'express'
import { pet, id, updatePet, deletePet } from '../controllers/pets.js'
import multer from 'multer';
import { db } from '../db.js'
// import { login } from '../controllers/auth.js'

const router = express.Router()
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const randomNumber = between(10, 200);
        const newFilename = `${new Date().getDate()}-${new Date().getMonth() +
            1}-${new Date().getFullYear()}-${randomNumber}` + `${file.originalname}`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage }).any();
router.post("/add", upload, (req, res) => {
    var arr = req.files;
    var filename = [];
    arr.forEach(ar => filename.push(ar.filename))
    const files = filename.toString();
    var d = req.body.inputs
    // DATA
    var e = JSON.parse(d)

    // DATA
    try {
        const values = [e.pet_name, e.price, e.pet_weight, e.pet_date, e.pet_gender, e.pet_color, e.pet_desc, files]
        const query = "INSERT INTO pets (pet_name, price, pet_weight, pet_date, pet_gender, pet_color, pet_desc, pet_imgs) VALUES (?)"
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("pet + image added!")
        })
    }
    catch (err) {
        console.log(err)
    }
})


router.get("/", pet)
router.get("/:id", id)


router.put("/update/:id", updatePet)
router.delete("/delete/:id", deletePet)

export default router
