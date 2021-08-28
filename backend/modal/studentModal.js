const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  _classId: { type: mongoose.Types.ObjectId, ref: 'classDb' }
  
})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student