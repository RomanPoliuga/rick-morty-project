import"./main-2fc84b47.js";console.log("JS WORKS 🚀");const t={list:document.querySelector("[data-characters]"),name:document.querySelector("[data-name]"),status:document.querySelector("[data-status]"),species:document.querySelector("[data-species]"),gender:document.querySelector("[data-gender]")},c="https://rickandmortyapi.com/api/character";async function s(){const a=new URLSearchParams({name:t.name.value,status:t.status.value,species:t.species.value,gender:t.gender.value});try{const e=await fetch(`${c}/?${a}`);if(!e.ok)throw new Error("Not found");const n=await e.json();r(n.results)}catch{t.list.innerHTML='<li class="empty">Oops! Nothing found</li>'}}function r(a){t.list.innerHTML=a.map(e=>`
      <li class="character-card">
        <img src="${e.image}" alt="${e.name}">
        <h3>${e.name}</h3>
        <p>${e.status} • ${e.species}</p>
        <p>${e.location.name}</p>
      </li>
    `).join("")}Object.values(t).slice(1).forEach(a=>a.addEventListener("change",s));t.name.addEventListener("input",s);s();
