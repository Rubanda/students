const express = require("express")
const studentsController = require("../controllers/students")

const router = express.Router()

router.get("/", studentsController.index)
router.post("/", studentsController.store)
router.get("/:id", studentsController.show)
router.put("/:id", studentsController.update)
router.put("/:id/remove-class", studentsController.removeClass)
router.post("/:id/courses", studentsController.storeCourse)
router.delete("/:id/courses/:studentId", studentsController.removeCourse)
router.delete("/:id", studentsController.destroy)

module.exports = router