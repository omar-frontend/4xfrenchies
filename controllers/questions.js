import { db } from '../db.js'

export const getQuestion = (req, res) => {
    const q = "SELECT * FROM faq"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const addQuestion = (req, res) => {
    const id = req.params.id;
    db.query("INSERT INTO faq (question, answer) VALUES (?)", [req.body.question, req.body.answer], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Question Added")
    })
}