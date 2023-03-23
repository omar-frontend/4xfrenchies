import CookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blog.js'
import petsRoutes from './routes/pets.js'
import questionsRoutes from './routes/questions.js'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();



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
        // origin: ["http://localhost:5174", "http://localhost:5175"]
        origin: ["https://4xfrenchies.com", "https://admin.4xfrenchies.com"]
    })
)

app.use("/api/blog", blogRoutes)
app.use("/api/pet", petsRoutes)
app.use("/api/faq", questionsRoutes)


const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.send("Server working")
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("API Working!");
});
