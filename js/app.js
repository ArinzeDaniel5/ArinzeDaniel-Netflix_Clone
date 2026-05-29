import { fetchMovies } from "./api.js";
import { createRow, setBanner } from "./ui.js";

const rowsContainer = document.getElementById("rows");
const searchInput = document.getElementById("search");

async function init() {
    const trending = await fetchMovies("/trending/movie/week");
    const topRated = await fetchMovies("/movie/top_rated");

    if (!trending?.results?.length) return;

    const randomMovie = trending.results[
        Math.floor(Math.random() * trending.results.length)
    ];

    setBanner(randomMovie);

    rowsContainer.innerHTML = "";
    rowsContainer.appendChild(createRow("Trending", trending.results));
    rowsContainer.appendChild(createRow("Top Rated", topRated.results));
}

init();

let timeout;

searchInput.addEventListener("input", () => {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
        const query = searchInput.value.trim();

        if (!query) {
            init();
            return;
        }

        const res = await fetchMovies(`/search/movie?query=${query}`);

        if (!res?.results?.length) {
            rowsContainer.innerHTML = "<p>No results found</p>";
            return;
        }

        rowsContainer.innerHTML = "";
        rowsContainer.appendChild(createRow("Search Results", res.results));
    }, 500);
});
