import express from 'express'
import { deletePost, id, post, updatePost } from '../controllers/blog.js'
import multer from 'multer';
import { db } from '../db.js'
const router = express.Router()

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../ui/public/uploads')
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
    var d = req.body
    const obj = JSON.parse(JSON.stringify(req.body));
    // DATA
    try {
        const values = [obj.blog_title, obj.blog_body, files]
        const query = "INSERT INTO blogs (blog_title, blog_body, blog_imgs) VALUES (?)"
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("blog + image added!")
        })
    }
    catch (err) {
        console.log(err)
    }
})

router.get("/", post)
router.get("/:id", id)


router.put("/update/:id", updatePost)
router.delete("/delete/:id", deletePost)





export default router
