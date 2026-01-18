
const select = document.querySelector("#season");
const episodesContainer = document.querySelector("#episodes");
const loadMoreBtn = document.querySelector(".seasons-list-btn");

let allEpisodes = [];        
let filteredEpisodes = [];   
let itemsPerPage = 10;        
let currentIndex = 0;        


select.addEventListener("change", handleSeasonChange);

loadMoreBtn.addEventListener("click", loadMoreEpisodes);


fetchAllEpisodes();


async function fetchAllEpisodes() {
    episodesContainer.innerHTML = "<p>Loading...</p>";
    try {
        let url = "https://rickandmortyapi.com/api/episode";
        let episodes = [];
        
       
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            episodes = episodes.concat(data.results);
            url = data.info.next;
        }

        allEpisodes = episodes;
        filteredEpisodes = allEpisodes;
        currentIndex = 0;
        episodesContainer.innerHTML = "";
        loadMoreEpisodes();
    } catch (error) {
        console.error("Error fetching episodes:", error);
        episodesContainer.innerHTML = "<p>Failed to load episodes</p>";
    }
}


function handleSeasonChange(event) {
    const season = event.target.value;

    
    if (season === "all") {
        filteredEpisodes = allEpisodes;
    } else {
        filteredEpisodes = allEpisodes.filter(ep => ep.episode.startsWith(season));
    }

    currentIndex = 0; 
    episodesContainer.innerHTML = ""; 
    loadMoreEpisodes(); 
}


function loadMoreEpisodes() {
    const nextIndex = currentIndex + itemsPerPage;
    const episodesToShow = filteredEpisodes.slice(currentIndex, nextIndex);

    renderEpisodes(episodesToShow);
    currentIndex = nextIndex;

   
    if (currentIndex >= filteredEpisodes.length) {
        loadMoreBtn.style.display = "none";
    } else {
        loadMoreBtn.style.display = "block";
    }
}


function renderEpisodes(episodes) {
    episodes.forEach(ep => {
        const seasonNumber = ep.episode.slice(1, 3);
        const seasonName = `Season ${Number(seasonNumber)}`;

        const card = document.createElement("div");
        card.classList.add("episode-card");

        card.innerHTML = `
            <img src="images-seasons-list/season${seasonNumber}.jpg" alt="${ep.name}">
            <h3>${ep.name}</h3>
            <p>${seasonName}</p>
            <p>${ep.air_date}</p>
        `;

        episodesContainer.appendChild(card);
    });
}
