"use strict"

const express = require("express")
const fetch = require("node-fetch")

const app = express()

// Templating engine
app.set("views", "./views")
app.set("view engine", "pug")

// Static files
app.use(express.static(__dirname + "/public"))

// Home
app.get("/", (req, res, next) => {
    let urls = [
        req.protocol + "://" + req.get("host") + "/api/categories",
        req.protocol + "://" + req.get("host") + "/api/flags"
    ]

    Promise.all(urls.map(url => 
        fetch(url).then(data => data.json())
    )).then((json) => {
        res.render("index", {
            categories: json[0],
            flags: json[1]
        })
    })
    .catch((err) => {
        next(err)
    })
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
const data = require("./data.json")

app.get("/api/categories", (req, res) => {
    res.json(data.reduce((categories, flag) => {
        if (categories.indexOf(flag.category) === -1)
            categories.push(flag.category)
        
        return categories;
    }, []))
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
app.get("/api/flags", (req, res) => {
    res.json(data.map(flag => {
        return {
            name: flag.name,
            image: flag.image
        }
    }))
})
app.get("/api/flag/:flag", (req, res) => {
    res.json({
        name: "Test",
        image: "test.svg",
        description: "This is a test flag",
        meaning: "This is some meaning",
        colors: [],
        design: "Some design",
        adoptionDate: 1234,
        historical: [],
        sources: []
    })
})

// Start on port 1337
app.listen(1337, () => {
    console.log("Listening on port 1337 ...")
})
