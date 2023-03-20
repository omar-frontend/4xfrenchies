import { db } from '../db.js'

export const pet = (req, res) => {
    const q = "SELECT * FROM pets"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const id = (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM pets WHERE id = ?", id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}


export const addPet = (req, res) => {
    const values = [req.body.pet_name, req.body.price, req.body.pet_weight, req.body.pet_date, req.body.pet_gender, req.body.pet_color, req.body.pet_desc, req.body.pet_imgs]
    db.query("INSERT INTO pets (pet_name, price, pet_weight, pet_date, pet_gender, pet_color, pet_desc, pet_imgs) VALUES (?)",
        [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Pet Added!")
        })
}

export const updatePet = (req, res) => {
    const id = req.params.id;
    const { pet_name, price, pet_weight, pet_date, pet_gender, pet_color, pet_desc, pet_imgs } = req.body;
    db.query("UPDATE pets SET pet_name = ?, price = ?, pet_weight = ?, pet_date = ?, pet_gender = ?, pet_color = ?, pet_desc = ?, pet_imgs = ? WHERE id = ?",
        [pet_name, price, pet_weight, pet_date, pet_gender, pet_color, pet_desc, pet_imgs, id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Pet Updated!")
        })
}

export const deletePet = (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM pets WHERE id = ?", id, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Pet Deleted!")
    })
}