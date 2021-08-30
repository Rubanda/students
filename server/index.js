const express = require("express")

const classesRouter = require("./routers/classes")
const studentsRouter = require("./routers/students")
const coursesRouter = require("./routers/courses")

const port = process.env.PORT || 8000

const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello")
})

app.use("/api/classes", classesRouter)
app.use("/api/students", studentsRouter)
app.use("/api/courses", coursesRouter)

app.listen(port, () => {
  console.log("Server started at port: ", port)
})