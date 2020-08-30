// Require in dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

// Create express instance as app
const app = express();
// Env Vars
dotenv.config();
// Is production?
const isProduction = process.env.PRODUCTION;
// Use cors with express
app.use(cors());
// JSON
app.use(express.json());
// Use morgan
app.use(morgan('dev'));

// Setup database connection
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose.connection.on("open", function (ref) {
    app.listen(3000, () => {
        console.log("Listening on port 3000...");
    });
});

// Default endpoint
app.get("/", (req, res) => {
    console.log(`${req.method} request received...`);
    res.send("You've reached the Folio api!");
});

// Require and use the routes
const authors = require("./routes/authors.js");
app.use("/authors", authors);

// ERROR handeling
// if not in production it will print the stacktrace

app.use((req, res, next) => {
    const error = new Error("Endpoint Not Found");
    error.status = 404;
    next(error)
});

app.use((err, req, res, next) => {
    if (!isProduction) {
        console.log(err.stack);
    }

    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: err,
        },
    });
});
