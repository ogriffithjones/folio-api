const express = require('express');
const app = express();

app.get("/", (req, res) => {
    console.log(req.method)

    res.send();
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})