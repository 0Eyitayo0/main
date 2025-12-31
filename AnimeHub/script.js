const animeGrid = document.getElementById("animeGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

let animeList = [];

// Fetch anime from Jikan API
fetch("https://api.jikan.moe/v4/top/anime")
  .then(response => response.json())
  .then(data => {
    animeList = data.data;
    displayAnime(animeList);
  })
  .catch(error => {
    console.error("Error fetching anime:", error);
  });

function displayAnime(animeArray) {
  animeGrid.innerHTML = "";

  animeArray.forEach(anime => {
    const card = document.createElement("div");
    card.classList.add("anime-card");

    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>${anime.synopsis ? anime.synopsis.slice(0, 100) + "..." : "No description available."}</p>
    `;

    animeGrid.appendChild(card);
  });
}

// Search filtering
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filteredAnime = animeList.filter(anime =>
    anime.title.toLowerCase().includes(query)
  );

  displayAnime(filteredAnime);
  noResults.style.display = filteredAnime.length === 0 ? "block" : "none";
});