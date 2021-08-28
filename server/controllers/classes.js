const models = require("../models")

const index = (req, res) => {
  models.Class.findAll().then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right."
    })
  })
}

const show = (req, res) => {
  const id = req.params.id

  models.Class.findByPk(id).then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({
      message: "Something isn't right."
    })
  })
}

const store = (req, res) => {
  const singleClass = {
    name: req.body.name
  }

  models.Class.create(singleClass).then(result => {
    res.status(201).json({
      message: "Class created successfully",
      class: result
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
}