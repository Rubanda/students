const models = require("../models")

const index = (req, res) => {
  models.Course.findAll().then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right."
    })
  })
}

const show = (req, res) => {
  const id = req.params.id

  models.Course.findByPk(id).then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right."
    })
  })
}

const store = (req, res) => {
  const course = {
    name: req.body.name,
  }

  models.Course.create(course).then(result => {
    res.status(201).json({
      message: "Course created successfully",
      course: result
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
  const course = {
    name: req.body.name,
  }

  models.Course.update(course, { where: { id } }).then(result => {
    res.status(200).json({
      message: "Course updated successfully",
      course: {
        id: id,
        ...course
      }
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

  models.Course.destroy({ where: { id } }).then(result => {
    res.status(200).json({
      message: "Course deleted successfully",
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
  destroy
}