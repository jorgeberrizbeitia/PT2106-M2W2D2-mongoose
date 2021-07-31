const mongoose = require("mongoose"); // mongoose allow us to connect to the Mongo DB

const StudentModel = require("./models/student.model") // the Model that will allow us to make changes to the Student Collection

// JSON files are automatically exported
const students = require("./students.json")

// Here is where we will make all our BD connections and stuff

// Here we stablish a connection
mongoose.connect("mongodb://localhost:27017/students-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(response => {
  console.log("1. YAYYY mongo connection established")

  // here we clean the collection everytime the file runs. Avoids duplicate information.
  // ! this is for teaching purposes! never drop you databases in RL
  // return mongoose.connection.dropDatabase();
  return StudentModel.deleteMany() // does exactly the same as above
})
.then(response => {
  console.log("2. Database cleared!")
  // here we add documents to our database

  // ** CREATE METHODS
  // Model.create( singleObj ) => adds a single document to a collection.
  // Model.insertMany( arrayOfObjs ) => adds multiple objects to the collection.

  // return StudentModel.create( { name: "Sina", age: 21, isHappy: true } )
  return StudentModel.insertMany( students )
})
.then(response => {
  console.log("3. Student added correctly")

  // ** READ METHODS

  // Model.find( query ) => finds all documents that match the query and returns an array
  // Model.findOne( query ) => finds the first documents that matches the query, returns only that obj
  // Model.findById( id ) => finds the document with the corresponding id, returns only that obj

  // return StudentModel.find( { isHappy: true } )
  // return StudentModel.find() // => this gives me all documents in collection
  // return StudentModel.findOne( { name: "Leo" } )

  // ** ADVANCED QUERIES

  // return StudentModel.find( { pizzaToppings: { $in: "Pinneaple" } } )
  // return StudentModel.find( { pizzaToppings: { $in: "Pepperoni" }, age: 22 } ) // checks two different properties. $and is optional
  // return StudentModel.find( {$and: { pizzaToppings: { $in: "Pepperoni" }, age: 22 } } ) // same as above with &and
  return StudentModel.find( { isHappy: true }, {_id: 0, name:1, age:1}, { limit: 2, sort:"name" } )
})
.then(response => {
  console.log("4 this is the students found", response)

  // ** UPDATE METHODS
  // Model.findOneAndUpdate( query, theUpdate, { new: true }  ) => finds one element matching the query and updates it
  // Model.findByIdAndUpdate( id, theUpdate, { new: true }  ) => finds one element matching the id and updates it
  // { new: true } This last argument makes sure the information received is the updated one

  return StudentModel.findOneAndUpdate( { name: "Alejandro" }, { isHappy: true, name:"Alejambro", age:18 }, { new: true } )
})
.then(response => {
  console.log("5. Student updated", response)

  // ** DELETE METHODS
  // Model.findOneAndDelete( query ) => finds document by query and removes it
  // Model.deleteOne( query ) => Same findOneAndDelete. Not good, doesn't send back the element deleted
  // Model.deleteMany( query ) => Deletes many matching the query
  // Model.findByIdAndDelete( id ) => will delete document matching the id

  return StudentModel.findOneAndDelete( { name: "Carolina" } )
})
.then(response => {
  console.log("6. Student Deleted", response)

  return StudentModel.find()
})
.then( (data) => console.log("ALL THE DATA:", data))
.catch((err) => {
  console.log(err)
})

