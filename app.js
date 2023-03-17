import CookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blog.js'
import petsRoutes from './routes/pets.js'

const app = express();
import { db } from './db.js'


//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", true);
    next();
})
app.use(express.json())
app.use(CookieParser())
app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
        origin: "https://4xfrenchies.com"
    })
)

app.use("/api/blog", blogRoutes)
app.use("/api/pet", petsRoutes)

app.get("/", (req, res) => {
    res.send("Server working")
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("API Working!");
});
