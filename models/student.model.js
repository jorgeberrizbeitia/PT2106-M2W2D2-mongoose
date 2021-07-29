const mongoose = require("mongoose");

// Create the Schema
let studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    max: 100,
    min: 10
  },
  isHappy: {
    type: Boolean,
    default: true
  },
  pizzaToppings: [{
    type: String,
    enum: ["Pinneaple", "Pepperoni", "Veggies"]
  }]
});

// Create the Model
let StudentModel = mongoose.model("student", studentSchema);

// exporting means it will be available to require from other files
module.exports = StudentModel;