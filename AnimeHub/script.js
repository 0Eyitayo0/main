const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".anime-card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", () => { // Code for searching
    const query = searchInput.value.toLowerCase(); // Turn the search input into lowercase for consistent search result
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(query)) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display = visibleCount === 0? "block" : "none";
});

cards.forEach(card => { // Clciking brings up info
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").textContent;
        alert(`You clicked on ${title}!`);
    });
});

cards.forEach(card => { // Toggles hidden information
    card.addEventListener("click", () => {
        const details = card.querySelector(".details");
        if (details) {
            details.classList.toggle("hidden");
        }
    });
});