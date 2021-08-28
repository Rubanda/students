const express = require("express")

const classesRouter = require("./routers/classes")

const port = process.env.PORT || 8080

const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello")
})

app.use("/api/classes", classesRouter)

app.listen(port, () => {
  console.log("Server started at port: ", port)
})