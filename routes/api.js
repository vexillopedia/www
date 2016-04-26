"use strict"

const express = require("express")
const router = express.Router()

const data = require("./../data.json")

router.get("/categories", (req, res) => {
    res.json(data.reduce((categories, flag) => {
        if (categories.indexOf(flag.category) === -1)
            categories.push(flag.category)
        
        return categories
    }, []))
})
router.get("/category/:category", (req, res) => {
    res.json(data.filter(flag => {
        return flag.category === req.params.category
    }))
})
router.get("/flags", (req, res) => {
    res.json(data.map(flag => {
        return {
            name: flag.name,
            image: flag.image
        }
    }))
})
router.get("/flag/:flag", (req, res) => {
    res.json(data.find(flag => {
        return flag.name === req.params.flag
    }))
})

module.exports = router