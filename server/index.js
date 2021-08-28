const express = require("express")
const classesRouter = require("./routers/classes")
const port = process.env.PORT || 8080

const app = express()

app.get("/", (req, res) => {
  res.send("Hello")
})

app.use("/classes", classesRouter)

app.listen(port, () => {
  console.log("Server started at port: ", port)
})