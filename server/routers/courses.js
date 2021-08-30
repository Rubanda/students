const express = require("express")
const coursesController = require("../controllers/courses")

const router = express.Router()

router.get("/", coursesController.index)
router.post("/", coursesController.store)
router.get("/:id", coursesController.show)
router.put("/:id", coursesController.update)
router.post("/:id/students", coursesController.storeStudent)
router.delete("/:id/students/:studentId", coursesController.removeStudent)
router.delete("/:id", coursesController.destroy)

module.exports = router