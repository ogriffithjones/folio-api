const router = require("express").Router();
const Project = require("../models/Project");

router.param("id", (req, res, next, id) => {
    Project.findById(id)
      .then((project) => {
        if (!project) {
          res.status(404).send("Project not found");
        } else {
          req.project = project;
          return next();
        }
      })
      .catch(next);
  });

router.get("/", (req, res, next) => {
    res.send("Welcome to the projects endpoint");
    Project.find({})
    .select("title description")
    .sort({ createdAt: "desc" })
    .then((results) => {
      return res.send(results);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  return res.status(200).send(req.article);
});

router.delete("/:id", (req, res, next) => {
    Project.findByIdAndDelete(req.project.id)
      .then((project) => {
        res.status(204).send(project);
      })
      .catch(next);
  });

module.exports = router;
