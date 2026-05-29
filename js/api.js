const API_KEY = "9fea0a2002d384632d2e16f8f47bd314";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(endpoint) {
    const separator = endpoint.includes("?") ? "&" : "?";
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Fetch failed:", err);
        return { results: [] };
    }
}
