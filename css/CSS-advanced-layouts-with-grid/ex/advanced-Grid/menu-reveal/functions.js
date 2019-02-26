const SITE = document.querySelector('.site');
let trigger = document.querySelector('.trigger');
let screenReaderText = document.querySelector('.trigger .screen-reader-text');


function revealMenu() {
    SITE.classList.toggle('reveal');
    trigger.getAttribute('aria-expanded') == 'false' ? trigger.setAttribute('aria-expanded', true) : trigger.setAttribute('aria-expanded', false);
    screenReaderText.innerHTML == 'Reveal menu' ? screenReaderText.innerHTML = 'Hide menu' : screenReaderText.innerHTML = 'Reveal menu';

}

trigger.addEventListener('click', revealMenu, false);