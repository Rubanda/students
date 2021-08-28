const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  name: { type: String },
  listOfStudent: { type: Number },
  _studentId: { type: mongoose.Types.ObjectId, ref: 'Student' }
  
})

const Course = mongoose.connect('Course', CourseSchema)

module.exports = Course