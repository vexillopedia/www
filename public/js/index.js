;(function () {
    // Caching DOM elements/arrays
    let selectTextSpan = document.getElementById("select-text")
    let searchTextSpan = document.getElementById("search-text")
    let searchFlagInput = document.getElementById("search-flag")
    
    let flagCards = document.querySelectorAll(".search .card")
    let flagCardsArray = Array.from(flagCards)
    
    // Progressive enhancement
    selectTextSpan.classList.add("hidden")
    searchTextSpan.classList.remove("hidden")
    searchFlagInput.classList.remove("hidden")
    
    flagCardsArray.forEach((card) => { 
        card.classList.add("hidden") 
    })
}())
