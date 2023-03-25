import CookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blog.js'
import petsRoutes from './routes/pets.js'
import questionsRoutes from './routes/questions.js'
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from "nodemailer";

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
        //origin: ["http://localhost:5174", "http://localhost:5175", "http://192.168.1.34:5173"]
        origin: ["https://4xfrenchies.com", "https://admin.4xfrenchies.com"]
    })
)
app.use("/api/auth", authRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/pet", petsRoutes)
app.use("/api/faq", questionsRoutes)


const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/public'));

import smtpTransport from 'nodemailer-smtp-transport'; // this is important


var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.hostinger.com',
    auth: {
        user: 'info@4xfrenchies.com',
        pass: 'iO^7G31$CnHd2wo'
    },
    secure: true
}));

transporter.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});
app.post("/contact", (req, res) => {
    
    const name = req.body.firstname + " " + req.body.lastname;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "info@4xfrenchies.com",
        subject: "4xfrenchies Have a new email!",
        html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    transporter.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "Message Sent" });
        }
    });
});

app.get("/", (req, res) => {
    res.send("Server working")
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("API Working!");
});
