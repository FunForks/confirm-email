require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3333

const { sendEmail } = require('./routes/email')
const { createToken, verifyToken } = require('./routes/token')


app.listen(PORT, () => {
  console.log(`Ctrl-click to open site at http://localhost:${PORT}`)
})


app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))


app.post("/sendemail", createToken, sendEmail )
app.get("/confirm/:token", verifyToken )