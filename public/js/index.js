;(function () {
    // Caching DOM elements/arrays
    let selectTextSpan = document.getElementById("select-text")
    let searchTextSpan = document.getElementById("search-text")
    let searchFlagInput = document.getElementById("search-flag")
    
    let flagCards = document.querySelectorAll(".search .card")
    let flagCardsArray = Array.from(flagCards)
    let flagNamesArray = flagCardsArray.map((card) => {
        return card.querySelector("span").innerText.toLowerCase()
    })
    
    // Progressive enhancement
    selectTextSpan.classList.add("hidden")
    searchTextSpan.classList.remove("hidden")
    searchFlagInput.classList.remove("hidden")
    
    flagCardsArray.forEach((card) => { 
        card.classList.add("hidden") 
    })
    
    // Search flags
    searchFlagInput.addEventListener("keyup", (e) => {
        let searchText = e.target.value.toLowerCase()

        flagCardsArray.forEach((card, i) => {
            (searchText && flagNamesArray[i].indexOf(searchText) > -1) ?
                card.classList.remove("hidden") :
                card.classList.add("hidden")
        })
    })
}())
