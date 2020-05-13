const router = require("express").Router();
var path = require("path");
const db = require("../models");

// module.exports = function(app) {
//   app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });
// };

//TODO: work out routes

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ date: 1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts/:id", (req, res) => {
  db.Exercise.create(req.body)
    .then(dbTransaction => {
      db.Workout.findByIdAndUpdate(req.params.id, dbTransaction._id)
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
