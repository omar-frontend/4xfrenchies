import express from 'express'
import { login } from '../controllers/auth.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send("Unauthorized: No token provided");
    }
    jwt.verify(token, "secretkey", (err, user) => {
        if (err) {
            return res.status(403).send("Forbidden: Invalid token");
        }
        req.body = user;
        next();
    });
};

router.get("/protected", authenticateToken, (req, res) => {
    const user = req.body;
    res.send(`Welcome, ${user.username}!`);
});

router.post("/login", login)


export default router
