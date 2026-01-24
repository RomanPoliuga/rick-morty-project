
import season01 from './images-seasons-list/season01.jpg';
import season02 from './images-seasons-list/season02.jpg';
import season03 from './images-seasons-list/season03.jpg';
import season04 from './images-seasons-list/season04.jpg';
import season05 from './images-seasons-list/season05.jpg';


const seasonImages = {
  '01': season01,
  '02': season02,
  '03': season03,
  '04': season04,
  '05': season05,
  
};


const select = document.querySelector('#season');
const episodesContainer = document.querySelector('#episodes');
const loadMoreBtn = document.querySelector('.seasons-list-btn');

let allEpisodes = [];
let filteredEpisodes = [];
let itemsPerPage = 10;
let currentIndex = 0;


select.addEventListener('change', handleSeasonChange);
loadMoreBtn.addEventListener('click', loadMoreEpisodes);


fetchAllEpisodes();


async function fetchAllEpisodes() {
  episodesContainer.innerHTML = '<p>Loading...</p>';

  try {
    let url = 'https://rickandmortyapi.com/api/episode';
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
    episodesContainer.innerHTML = '';
    loadMoreEpisodes();
  } catch (error) {
    console.error('Error fetching episodes:', error);
    episodesContainer.innerHTML = '<p>Failed to load episodes</p>';
  }
}

function handleSeasonChange(event) {
  const season = event.target.value;

  filteredEpisodes =
    season === 'all'
      ? allEpisodes
      : allEpisodes.filter(ep => ep.episode.startsWith(season));

  currentIndex = 0;
  episodesContainer.innerHTML = '';
  loadMoreBtn.style.display = 'block';
  loadMoreEpisodes();
}

function loadMoreEpisodes() {
  const nextIndex = currentIndex + itemsPerPage;
  const episodesToShow = filteredEpisodes.slice(currentIndex, nextIndex);

  renderEpisodes(episodesToShow);
  currentIndex = nextIndex;

  loadMoreBtn.style.display =
    currentIndex >= filteredEpisodes.length ? 'none' : 'block';
}
function renderEpisodes(episodes) {
  episodes.forEach(ep => {
    const seasonNumber = ep.episode.slice(1, 3);
    const seasonName = `Season ${Number(seasonNumber)}`;

    const imgSrc = seasonImages[seasonNumber];

    const card = document.createElement('div');
    card.classList.add('episode-card');

    card.innerHTML = `
      <img src="${imgSrc}" alt="${ep.name}">
      <h3>${ep.name}</h3>
      <p>${seasonName}</p>
      <p>${ep.air_date}</p>
    `;

    episodesContainer.appendChild(card);
  });
}
