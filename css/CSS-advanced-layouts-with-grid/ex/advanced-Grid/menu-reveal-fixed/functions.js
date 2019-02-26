const SITE = document.querySelector('.site');
const TRIGGER = document.querySelector('.trigger');
const MENU = document.querySelector('.masthead nav');
let screenReaderText = document.querySelector('.trigger .screen-reader-text');


function revealMenu() {
    SITE.classList.toggle('reveal');
    MENU.classList.add('open');
    TRIGGER.getAttribute('aria-expanded') == 'false' ? TRIGGER.setAttribute('aria-expanded', true) : TRIGGER.setAttribute('aria-expanded', false);
    screenReaderText.innerHTML == 'Reveal menu' ? screenReaderText.innerHTML = 'Hide menu' : screenReaderText.innerHTML = 'Reveal menu';

}

function removeMenu() {
    console.info('Transition event');
    if ( screenReaderText.innerHTML == 'Reveal menu' ) {
        MENU.classList.remove('open');
    }
}

TRIGGER.addEventListener('click', revealMenu, false);
SITE.addEventListener('transitionend', removeMenu, true);