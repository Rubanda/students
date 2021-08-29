const express = require("express")
const coursesController = require("../controllers/courses")

const router = express.Router()

router.get("/", coursesController.index)
router.post("/", coursesController.store)
router.get("/:id", coursesController.show)
router.put("/:id", coursesController.update)
router.delete("/:id", coursesController.destroy)

module.exports = router