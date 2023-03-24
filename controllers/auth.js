import { db } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const login = (req, res) => {

    // Check if user exists
    const q = "SELECT * FROM admin WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {

        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(404).json("User not found!")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if (!checkPassword) return res.status(404).json("Wrong password!")

        const token = jwt.sign({ id: data[0].id, username: data[0].username }, "secretkey", { expiresIn: "30m" })

        res.json({ token })
        // const { password, ...others } = data[0]
        // res.cookie("accessToken", token).status(200).json(others);
    })
}

