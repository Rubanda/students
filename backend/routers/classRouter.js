const express = require('express')
const classDb = require('../modal/classModal')

const classRouter = express.Router()

classRouter.post('/',async (req, res) => {
  const classs = new classDb({
    name: req.body.name
  })
    const createdClass = await classs.save()
    res.status(201).send({message: 'New class created', classes: createdClass })

})

classRouter.get('/',async(req, res) => {
  const classs = await classDb.find({})

  res.status(201).send(classs)
})

// classRouter.get('/:id/students', async (req, res) => {
//   const students = .find({_classId: req.params.id})
// })

classRouter.get('/:id', async (req, res) => {
  const classOne = await classDb.findById(req.params.id)
  res.status(201).send(classOne)
})

module.exports = classRouter