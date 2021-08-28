const express = require('express')
const mongoose  = require('mongoose')
const classRouter = require('./routers/classRouter')
const studentRouter = require('./routers/studentRouter')
const port = process.env.PORT || 5000

const app = express()

//enable our app to parse json data format
app.use(express.json())



mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/studentPortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch((error) => (console.error(error)))


app.use('/api/class', classRouter)
app.use('/api/student',studentRouter)

app.get('/', (req, res) => {
  console.log('Serve ready')
})
app.listen(port, () => {
  console.log(`listening to http://localhost:${port}`)
})