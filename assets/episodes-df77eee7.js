import"./main-4024f8b9.js";const p=document.querySelector("#season"),t=document.querySelector("#episodes"),d=document.querySelector(".seasons-list-btn");let r=[],i=[],u=6,n=0;p.addEventListener("change",m);d.addEventListener("click",l);h();async function h(){t.innerHTML="<p>Loading...</p>";try{let s="https://rickandmortyapi.com/api/episode",e=[];for(;s;){const a=await(await fetch(s)).json();e=e.concat(a.results),s=a.info.next}r=e,i=r,n=0,t.innerHTML="",l()}catch(s){console.error("Error fetching episodes:",s),t.innerHTML="<p>Failed to load episodes</p>"}}function m(s){const e=s.target.value;e==="all"?i=r:i=r.filter(o=>o.episode.startsWith(e)),n=0,t.innerHTML="",l()}function l(){const s=n+u,e=i.slice(n,s);f(e),n=s,n>=i.length?d.style.display="none":d.style.display="block"}function f(s){s.forEach(e=>{const o=e.episode.slice(1,3),a=`Season ${Number(o)}`,c=document.createElement("div");c.classList.add("episode-card"),c.innerHTML=`
            <img src="imges-seasons-list/season${o}.jpg" alt="${e.name}">
            <h3>${e.name}</h3>
            <p>${a}</p>
            <p>${e.air_date}</p>
        `,t.appendChild(c)})}
