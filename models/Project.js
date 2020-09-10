const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        body: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref: "Author"}
    },
    { timestamps: true}
);

module.exports = mongoose.model("Project", ProjectSchema);