const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/guiapics").then(() => {
    console.log("Conectado com o banco")
}).catch(err => {
    console.log(err)
})

app.get("/", (req, res) => {
    res.json({})
})

module.exports = app