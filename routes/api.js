"use strict"

const express = require("express")
const router = express.Router()

// Data
const cities = require("./../data/cities.json")
const countries = require("./../data/countries.json")
const countrySubdivisions = require("./../data/country-subdivisions.json")
const dependentTerritories = require("./../data/dependent-territories.json")
const internationalOrganizations = require("./../data/international-organizations.json")
const unrecognizedStates = require("./../data/unrecognized-states.json")

const allFlags = [].concat(
    countries, 
    unrecognizedStates, 
    internationalOrganizations,
    dependentTerritories,
    countrySubdivisions,
    cities
)

// Categories API
router.get("/categories", (req, res) => {
    res.json(allFlags
        .reduce((categories, flag) => {
            if (categories.indexOf(flag.category) === -1)
                categories.push(flag.category)

            return categories
        }, ["All Flags"])
        .sort()
    )
})
router.get("/category/:category", (req, res) => {
    switch (req.params.category) {
        case "All Flags":
            res.json(allFlags
                .map(flag => flag.name)
                .sort()
            )
            break
        case "Cities":
            res.json(cities
                .map(flag => flag.name)
                .sort()
            )
            break
        case "Countries":
            res.json(countries
                .map(flag => flag.name)
                .sort()
            )
            break
        case "Country Subdivisions":
            res.json(countrySubdivisions
                .map(flag => flag.name)
                .sort()
            )
            break
        case "Dependent Territories":
            res.json(dependentTerritories
                .map(flag => flag.name)
                .sort()
            )
            break
        case "International Organizations":
            res.json(internationalOrganizations
                .map(flag => flag.name)
                .sort()
            )
            break
        case "Unrecognized States":
            res.json(unrecognizedStates
                .map(flag => flag.name)
                .sort()
            )
            break
        default:
            res.status(404).send("Category " + req.params.category + " not found.")
    }
})

// Flag API
router.get("/flags", (req, res) => {
    res.json(allFlags
        .map(flag => flag.name)
        .sort()
    )
})
router.get("/flag/:flag", (req, res) => {
    let flag = allFlags
        .find(flag => flag.name === req.params.flag)
    
    if (flag) 
        res.json(flag)
    else
        res.status(404).send("Flag " + req.params.flag + " not found.")
})

module.exports = router