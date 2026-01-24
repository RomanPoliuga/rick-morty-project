const refs = {
  list: document.querySelector("[data-characters]"),
  name: document.querySelector("[data-name]"),
  status: document.querySelector("[data-status]"),
  species: document.querySelector("[data-species]"),
  gender: document.querySelector("[data-gender]"),
};

const BASE_URL = "https://rickandmortyapi.com/api/character";

async function fetchCharacters() {
  const params = new URLSearchParams({
    name: refs.name.value,
    status: refs.status.value,
    species: refs.species.value,
    gender: refs.gender.value,
  });

  try {
    const response = await fetch(`${BASE_URL}/?${params}`);
    if (!response.ok) throw new Error("Not found");

    const data = await response.json();
    renderCharacters(data.results);
  } catch {
    refs.list.innerHTML = `<li class="empty">Oops! Nothing found</li>`;
  }
}

function renderCharacters(characters) {
  refs.list.innerHTML = characters
    .map(
      (char) => `
      <li class="character-card">
        <img src="${char.image}" alt="${char.name}">
        <h3>${char.name}</h3>
        <p>${char.status} • ${char.species}</p>
        <p>${char.location.name}</p>
      </li>
    `
    )
    .join("");
}

Object.values(refs)
  .slice(1)
  .forEach((el) => el.addEventListener("change", fetchCharacters));

refs.name.addEventListener("input", fetchCharacters);

fetchCharacters();