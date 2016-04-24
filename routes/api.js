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
router.get("/flags", (req, res) => {
    res.json(data.map(flag => {
        return {
            name: flag.name,
            image: flag.image
        }
    }))
})
router.get("/flag/:flag", (req, res) => {
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

module.exports = router