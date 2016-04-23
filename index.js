var express = require("express")
var app = express()

// Templating engine
app.set("views", "./views")
app.set("view engine", "pug")

// Static files
app.use(express.static(__dirname + "/public"))

// Home
app.get("/", (req, res) => {
    res.render("index")
})

// Categories
app.get("/category/:category", (req, res) => {
    res.render("category", {
        name: req.params.category
    })
})

// Flags
app.get("/flag/:flag", (req, res) => {
    res.render("flag", {
        name: req.params.flag
    })
})

// API
app.get("/api/categories", (req, res) => {
    res.json([
        {
            name: "Countries"
        },{
            name: "All"
        }
    ])
})
app.get("/api/category/:category", (req, res) => {
    res.json([
        {
            name: "Test",
            flag: "test.svg"
        },{
            name: "Another Test",
            flag: "another-test.svg"
        }
    ])
})
app.get("/api/flag/:flag", (req, res) => {
    res.json({
        name: "Test",
        flag: "test.svg",
        description: "This is a test flag"
    })
})

// Start on port 1337
app.listen(1337, () => {
    console.log("Listening on port 1337 ...")
})
