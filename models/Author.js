const mongoose = require("mongoose");


// Create a new Author Schema
const AuthorSchema = new mongoose.Schema(
    // Schema
    {
        name: { type: String, required: true },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "An email address is required"],
            match: [/\S+@\S+\.\S+/, "not a valid email address"],
            index: true
        },
        profile: String,
        about: String,
        links: [{ 
            name: String, 
            url: String 
        }],
        projects: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Project" 
        }]
    },
    // Options
    { timestamps: true }
);

// create a model for the Schema
module.exports = mongoose.model("Author", AuthorSchema);
