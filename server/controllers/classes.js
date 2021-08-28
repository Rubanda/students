const index = (req, res) => {
  const classes = "Classes list"
  res.send(classes)
}

module.exports = {
  index,
}