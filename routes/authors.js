const router = require("express").Router();
const Author = require("../models/Author");

// Middlewear
// find an author by its id
router.param("id", (req, res, next, id) => {
  Author.findById(id)
    .populate("author")
    .then((author) => {
      if (!author) {
        res.status(404).send(`The author ${id} was not found.`);
      } else {
        req.author = author;
        return next();
      }
    })
    .catch(next);
});

router.get("/", (req, res, next) => {
  Author.find({})
    .select("name url")
    .sort({ createdAt: "desc" })
    .then((results) => {
      return res.send(results);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  const author = new Author(req.body);
  author
    .save()
    .then((result) => {
      return res.status(201).send(result);
    })
    .catch(next);
});

module.exports = router;
