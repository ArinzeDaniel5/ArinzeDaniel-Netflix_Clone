export function createRow(title, movies) {
    const row = document.createElement("div");
    row.classList.add("row");

    row.innerHTML = `
        <h2>${title}</h2>
        <div class="row-posters">
            ${movies.map(m => {
                const imgUrl = m.poster_path
                    ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                    : "fallback.jpg";

                return `
                    <img 
                        class="poster"
                        loading="lazy"
                        src="${imgUrl}"
                        data-id="${m.id}"
                    >
                `;
            }).join("")}
        </div>
    `;

    // Add click interaction
    row.addEventListener("click", (e) => {
        if (e.target.classList.contains("poster")) {
            const id = e.target.dataset.id;
            console.log("Movie clicked:", id);
        }
    });

    return row;
}

export function setBanner(movie) {
    const banner = document.getElementById("banner");

    const bg = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "fallback-banner.jpg";

    banner.style.backgroundImage = `url(${bg})`;
}
