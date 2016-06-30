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
        fetch(url).then(response => {
            if (response.status === 200)
                return response.json()
            else
                return Promise.reject(response)
        })
    )).then((json) => {
        res.render("category", {
            name: req.params.category,
            flags: json[0]
        })
    })
    .catch((err) => {
        if (err.status === 404)
            res.send("Category " + req.params.category + " not found.")
        else
            res.send("Oops, that wasn't expected!")

        next(err)
    })
})

// Flags
router.get("/flag/:flag", (req, res) => {
    let urls = [
        req.protocol + "://" + req.get("host") + "/api/flag/" + req.params.flag
    ]
    
    Promise.all(urls.map(url => 
        fetch(url).then(response => {
            if (response.status === 200)
                return response.json()
            else
                return Promise.reject(response)
        })
    )).then((json) => {
        res.render("flag", json[0])
    })
    .catch((err) => {
        if (err.status === 404)
            res.send("Flag " + req.params.flag + " not found.")
        else
            res.send("Oops, that wasn't expected!")

        next(err)
    })
})

module.exports = router