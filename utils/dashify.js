"use strict"

const dashify = (str) => 
    String(str)
        .replace(/ /g, "-")
        .replace(/\(/g, "-")
        .replace(/\)/g, "")
        .toLowerCase()

module.exports = dashify