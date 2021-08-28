const express = require("express")
const classesController = require("../controllers/classes")

const router = express.Router()

router.get("/", classesController.index)

module.exports = router