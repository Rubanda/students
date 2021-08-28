const express = require('express');
const Student = require('../modal/studentModal')
const classDb = require('../modal/studentModal')

const studentRouter = express.Router()

studentRouter.post('/:id', async (req, res) => {
  const students = new Student({
    name: req.body.name,
    age: req.body.age,
    _classId: req.params.id
  })
  const createdStudent = await students.save()

  res.status(201).send({ message: 'created a student', student: createdStudent})
})

studentRouter.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id)
  res.status(201).send(student)
})

module.exports = studentRouter