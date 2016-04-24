"use strict"

const express = require("express")

const webapp = require("./routes/webapp")
const api = require("./routes/api")

const app = express()

// Templating engine
app.set("views", "./views")
app.set("view engine", "pug")

// Static files
app.use(express.static(__dirname + "/public"))

// Webapp
app.use("/", webapp)

// API
app.use("/api", api)

// Start on port 1337
app.listen(1337, () => {
    console.log("Listening on port 1337 ...")
})
