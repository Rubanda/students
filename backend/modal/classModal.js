const mongoose = require('mongoose')

const ClassSchema = new mongoose.Schema({
  name: { type: String },
  // _studentId: {type: mongoose.Types.ObjectId, ref: 'Student' }
})

const classDb = mongoose.model('classDb', ClassSchema)

module.exports = classDb