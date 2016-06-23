const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect

const app = require("express")()
const api = require("./api")

const categories = [
    "All Flags"
  , "Cities"
  , "Countries"
  , "Country Subdivisions"
  , "Dependent Territories"
  , "International Organizations"
  , "Unrecognized States"
]

app.use("/", api)
chai.use(chaiHttp)

describe("api", function () {
    // Categories API
    describe("/categories", function () {
        it("should return a list of categories", function (done) {
            chai.request(app)
                .get("/categories")
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(Array.isArray(res.body)).to.equal(true)
                    done()
                })
        })
        it("should always include an 'All Flags' category", function (done) {
            chai.request(app)
                .get("/categories")
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body.indexOf("All Flags")).to.not.equal(-1)
                    done()
                })
        })
        it("should sort categories alphabetically", function (done) {
            chai.request(app)
                .get("/categories")
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body.some((category, i, categories) => !i || categories[i-1] < category)).to.equal(true)
                    done()
                })
        })
        it("should include unique categories", function (done) {
            chai.request(app)
                .get("/categories")
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body.some((category, i, categories) => !i || categories[i - 1] !== category)).to.equal(true)
                    done()
                })
        })
    })

    describe("/category/:category", function () {
        categories.forEach((category) => {
            it("should retrieve and sort unique flags from '" + category + "'", function (done) {
                chai.request(app)
                    .get("/category/" + category)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(Array.isArray(res.body)).to.equal(true)
                        expect(res.body.some((flag, i, flags) => !i || flags[i-1] < flag)).to.equal(true)
                        expect(res.body.some((flag, i, flags) => !i || flags[i-1] !== flag)).to.equal(true)
                        done()
                    })
            })
        })
        it("should return a 404 status code when not in the data", function (done) {
            chai.request(app)
                .get("/category/Not A Category")
                .end(function (err, res) {
                    expect(res).to.have.status(404)
                    done()
                })
        })
    })

    // Flags API
    describe("/flags", function () {
        it("should return all the flags, sorted and unique", function (done) {
            chai.request(app)
                .get("/flags")
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(Array.isArray(res.body)).to.equal(true)
                    expect(res.body.some((flag, i, flags) => !i || flags[i-1] < flag)).to.equal(true)
                    expect(res.body.some((flag, i, flags) => !i || flags[i-1] !== flag)).to.equal(true)
                    done()
                })
        })
    })

    describe("/flag/:flag", function () {
        // -- TODO
        // -- Find a way to retrieve all the flags to test them individually
        let flags = ["Valladolid", "Spain"]

        flags.forEach(function (flag) {
            it("should return all the flag details of " + flag, function (done) {
                chai.request(app)
                    .get("/flag/" + flag)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        
                        let flag = res.body

                        expect(typeof flag.name).to.equal("string")
                        expect(flag.name).to.not.equal("")

                        expect(typeof flag.category).to.equal("string")
                        expect(flag.category).to.not.equal("")

                        expect(typeof flag.history).to.equal("string")
                        expect(flag.history).to.not.equal("")

                        expect(typeof flag.meaning).to.equal("string")
                        expect(flag.meaning).to.not.equal("")

                        expect(typeof flag.ratio).to.equal("string")
                        expect(flag.ratio).to.not.equal("")

                        expect(Array.isArray(flag.colors)).to.equal(true)
                        expect(flag.colors.every((color) => typeof color.name === "string" && typeof color.hex === "string" && color.hex.slice(0, 1) === "#" && !!parseInt(color.hex.slice(1), 16))).to.equal(true)

                        expect(typeof flag.design).to.equal("string")
                        expect(flag.design).to.not.equal("")

                        expect(typeof flag.adoptionDate).to.equal("number")

                        expect(typeof flag.related).to.equal("object")
                        if (Object.keys(flag.related).length)
                            expect(Object.keys(flag.related).every((key) => flag.related[key].every((relatedFlag) => typeof relatedFlag === "string"))).to.equal(true)

                        expect(Array.isArray(flag.sources)).to.equal(true)
                        expect(flag.sources.every((source) => typeof source === "string")).to.equal(true)

                        done()
                    })
            })
        })
    })
})