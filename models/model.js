const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "Type is Required"
  },

  name: {
    type: String,
    trim: true,
    required: "Name is Required"
  },

  duration: {
    type: Number
  },

  weight: {
    type: Number
  },

  reps: {
    type: Number
  },

  sets: {
    type: Number
  }
});

const Model = mongoose.model("workout", workoutSchema);

module.exports = Model;
