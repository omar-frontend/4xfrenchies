const express = require('express')
const app = express();

app.get("/", (req, res) => {
    res.send("Server working")
})

app.listen(process.env.PORT || 3001, () => {
    console.log("API Working!");
});
