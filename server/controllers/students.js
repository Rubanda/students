const models = require("../models")

const index = (req, res) => {
  models.Student.findAll().then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right."
    })
  })
}

const show = (req, res) => {
  const id = req.params.id

  models.Student.findByPk(id).then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right."
    })
  })
}

const store = (req, res) => {
  const student = {
    name: req.body.name,
    age: req.body.age,
    class_id: req.body.class_id
  }

  models.Student.create(student).then(result => {
    res.status(201).json({
      message: "Student created successfully",
      student: result
    })
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right.",
      error: error
    })
  })
}

const update = async (req, res) => {
  const id = req.params.id
  const student = {
    name: req.body.name,
    age: req.body.age,
    class_id: req.body.class_id
  }

  models.Student.update(student, { where: { id } }).then(result => {
    res.status(200).json({
      message: "Student updated successfully",
      student: {
        id: id,
        ...student
      }
    })
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right.",
      error: error
    })
  })
}

const removeClass = async (req, res) => {
  const id = req.params.id
  const student = {
    class_id: null
  }

  models.Student.update(student, { where: { id } }).then(result => {
    res.status(200).json({
      message: "Student class removed successfully",
    })
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right.",
      error: error
    })
  })
}

const destroy = async (req, res) => {
  const id = req.params.id

  models.Student.destroy({ where: { id } }).then(result => {
    res.status(200).json({
      message: "Student deleted successfully",
    })
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right.",
      error: error
    })
  })
}

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
  removeClass
}