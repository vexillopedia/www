;(function (){
    // Progressive enhancement
    document.getElementById("select-text").classList.add("hidden")
    document.getElementById("search-text").classList.remove("hidden")
    document.getElementById("search-flag").classList.remove("hidden")
    
    Array.from(document.querySelectorAll(".search .card")).forEach((card) => {
        card.classList.add("hidden")
    })
}())
