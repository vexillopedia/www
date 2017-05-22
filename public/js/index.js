;(function () {
    // Caching DOM elements/arrays
    var selectTextSpan = document.getElementById("select-text")
    var searchTextSpan = document.getElementById("search-text")
    var searchFlagInput = document.getElementById("search-flag")

    var flagCards = document.querySelectorAll(".search .card")
    var flagCardsArray = Array.prototype.slice.call(flagCards)
    var flagNamesArray = flagCardsArray.map(function (card) {
        return card.querySelector("span").innerText.toLowerCase()
    })

    // Progressive enhancement
    selectTextSpan.classList.add("hidden")
    searchTextSpan.classList.remove("hidden")
    searchFlagInput.classList.remove("hidden")
    
    flagCardsArray.forEach(function (card) { 
        card.classList.add("hidden") 
    })

    // Scroll up when search flag input is focused
    searchFlagInput.addEventListener("focus", function () {
        searchTextSpan.scrollIntoView()
    })

    // Search flags
    searchFlagInput.addEventListener("keyup", function (e) {
        var searchText = e.target.value.toLowerCase()

        flagCardsArray.forEach(function (card, i) {
            (searchText && flagNamesArray[i].indexOf(searchText) > -1) ?
                card.classList.remove("hidden") :
                card.classList.add("hidden")
        })
    })
}())
