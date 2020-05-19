const router = require("express").Router();
var path = require("path");
const db = require("../models");

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/api/workouts", (req, res) => {
  db.Workout.find({}).populate("exercise")
    .sort({ date: 1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).populate("exercise")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  db.Exercise.findOneAndUpdate({name: req.body.name}, req.body, {new: true, upsert: true})
    .then(dbTransaction => {
      console.log(dbTransaction);
      let myid = req.params.id;
      let update = {exercise: dbTransaction._id};
      console.log(myid);
      console.log(update);
      db.Workout.findOneAndUpdate({_id: myid}, {$push: update}, {new: true})
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
