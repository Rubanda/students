const express = require("express")
const cors = require("cors")
const classesRouter = require("./routers/classes")
const studentsRouter = require("./routers/students")
const coursesRouter = require("./routers/courses")


const bodyParser = require("body-parser")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello")
})

app.use("/api/classes", classesRouter)
app.use("/api/students", studentsRouter)
app.use("/api/courses", coursesRouter)

module.exports = app