import { db } from '../db.js'



export const post = (req, res) => {
    const q = "SELECT * FROM blogs"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const id = (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM blogs WHERE id = ?", id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}



export const updatePost = (req, res) => {
    const id = req.params.id;
    const { blog_title, blog_body } = req.body;
    db.query("UPDATE blogs SET blog_title = ?, blog_body = ? WHERE id = ?",
        [blog_title, blog_body, id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Blog Updated!")
        })
}

export const deletePost = (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM blogs WHERE id = ?", id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("blog deleted!")
    })
}
