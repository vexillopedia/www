"use strict"

const express = require("express")
const router = express.Router()

// Data
const countries = require("./../data/countries.json")
const unrecognizedCountries = require("./../data/unrecognized-countries.json")
const internationalOrganizations = require("./../data/international-organizations.json")
const dependentTerritories = require("./../data/dependent-territories.json")
const countrySubdivisions = require("./../data/country-subdivisions.json")
const cities = require("./../data/cities.json")

const allFlags = [].concat(
    countries, 
    unrecognizedCountries, 
    internationalOrganizations,
    dependentTerritories,
    countrySubdivisions,
    cities
)

// Sorter function to sort flags by name
function byName (a, b) {
    return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
}

// Categories API
router.get("/categories", (req, res) => {
    res.json(allFlags
        .reduce((categories, flag) => {
            if (categories.indexOf(flag.category) === -1)
                categories.push(flag.category)

            return categories
        }, [])
        .sort()
    )
})
router.get("/category/:category", (req, res) => {
    switch (req.params.category) {
        case "Countries":
            res.json(countries.sort(byName))
            break
        case "Unrecognized Countries":
            res.json(unrecognizedCountries.sort(byName))
            break
        case "International Organizations":
            res.json(internationalOrganizations.sort(byName))
            break
        case "Dependent Territories":
            res.json(dependentTerritories.sort(byName))
            break
        case "Country Subdivisions":
            res.json(countrySubdivisions.sort(byName))
            break
        case "Cities":
            res.json(cities.sort(byName))
            break
        default:
            res.status(404).send({error: "Category not found."})
    }
})

// Flag API
router.get("/flags", (req, res) => {
    res.json(allFlags
        .map(flag => {
            return {
                name: flag.name,
                image: flag.image
            }
        })
        .sort(byName)
    )
})
router.get("/flag/:flag", (req, res) => {
    res.json(allFlags
        .find(flag => {
            return flag.name === req.params.flag
        })
    )
})

module.exports = router