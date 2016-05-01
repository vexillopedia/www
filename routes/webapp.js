"use strict"

const express = require("express")
const fetch = require("node-fetch")

const router = express.Router()

// Home
router.get("/", (req, res, next) => {
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
router.get("/category/:category", (req, res) => {
    let urls = [
        req.protocol + "://" + req.get("host") + "/api/category/" + req.params.category
    ]
    
    Promise.all(urls.map(url => 
        fetch(url).then(data => data.json())
    )).then((json) => {
        res.render("category", {
            name: req.params.category,
            flags: json[0]
        })
    })
    .catch((err) => {
        next(err)
    })
})

// Flags
router.get("/flag/:flag", (req, res) => {
    res.render("flag", {
        name: req.params.flag
    })
})

module.exports = router