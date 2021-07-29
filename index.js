const mongoose = require("mongoose");

const StudentModel = require("./models/student.model")

const students = require("./students.json")

// Here is where we will make all our BD connections and stuff

// Here we stablish a connection

mongoose.connect("mongodb://localhost:27017/students-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(response => {
  console.log("YAYYY mongo connection established")

  // clean the collection everytime the file runs
  // ! this is for teaching purposes! never drop you databases in RL
  return mongoose.connection.dropDatabase();
})
.then(response => {

  // here we add documents to our database
  // => add a single document to a collection
  // return StudentModel.create( { name: "Sina", age: 21, isHappy: true } )

  // JSON files are automatically exported
  

  return StudentModel.insertMany( students )
})
.then(response => {
  console.log("Student added correctly", response)
})
.catch((err) => {
  console.log(err)
})

