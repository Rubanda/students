const express = require("express")
const classesController = require("../controllers/classes")

const router = express.Router()

router.get("/", classesController.index)
router.post("/", classesController.store)
router.get("/:id", classesController.show)

module.exports = router