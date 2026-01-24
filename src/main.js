import './sass/main.scss';

const characters = [
  {
    name: 'Rick Sanchez',
    image: './img/rick-character.png',
    text: 'Rick Sanchez is a brilliant but deeply troubled scientist and one of the main characters in the animated TV show Rick and Morty.',
    bgColor: '#1a2e1fff'
  },
  {
    name: 'Morty Smith',
    image: './img/morty-smith.png',
    text: 'Morty Smith is the other main character in the animated TV show Rick and Morty, and Rick\'s grandson.',
    bgColor: '#1a1a2e'
  },
  {
    name: 'Summer Smith',
    image: './img/summer-smith.png',
    text: 'Summer Smith is Morty\'s older sister and one of the main characters in Rick and Morty. Initially portrayed as a typical teenager, she develops into a more complex and independent character.',
    bgColor: '#DAF836'
  },
  {
    name: 'Beth Smith',
    image: './img/beth-smith.png',
    text: 'Beth is a horse surgeon, and, as Rick\'s daughter, she is intelligent if sometimes cold.',
    bgColor: '#44af69'
  },
  {
    name: 'Jerry Smith',
    image: './img/jerry-smith.png',
    text: 'Jerry is the husband of Beth Smith, the father of Summer Smith and Morty Smith, and the son-in-law of Rick Sanchez.',
    bgColor: '#1a1a2e'
  }
];


function updateCharacter(character) {
  const heroImage = document.querySelector('.hero-image');
  const heroMediaBg = document.querySelector('.hero-media-bg');
  const heroContent = document.querySelector('.hero-content');
  
  if (heroImage) {
    heroImage.src = character.image;
    heroImage.alt = character.name;
  }
  
  // Змінюємо колір фону
  if (heroMediaBg) {
    heroMediaBg.style.backgroundColor = character.bgColor;
  }
  
  const characterNames = document.querySelectorAll('.character-name');
  characterNames.forEach(name => {
    name.classList.remove('active');
    if (name.textContent === character.name) {
      name.classList.add('active');
    }
  });
  
  const characterTexts = document.querySelectorAll('.character-text');
  characterTexts.forEach(text => {
    if (text.previousElementSibling.textContent === character.name) {
      text.textContent = character.text;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const characterNames = document.querySelectorAll('.character-name');
  
  characterNames.forEach(nameElement => {
    nameElement.addEventListener('click', function() {
      const characterName = this.textContent.trim();
      const character = characters.find(char => char.name === characterName);
      
      if (character) {
        updateCharacter(character);
      }
    });
    
    nameElement.style.cursor = 'pointer';
  });
});
import './sass/main.scss'