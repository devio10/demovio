import { states } from "./states.js";
let nextSectionY = document.querySelector('.why-us').offsetHeight;
let stateSectionY = document.querySelector('section.states').offsetHeight;
let hiddenLink = false;
const header = document.querySelector('header');
let headerState = false;

const throttle = (callback, delay) => {
    let lastTime = 0
    return (...args) => {
        const now = Date.now()
        if (now - lastTime >= delay) {
            lastTime = now
            callback(...args)
        }
    }
}

function handleScroll() {
    console.log('handling');
    const scrollY = window.scrollY;
  
    if (scrollY >= stateSectionY && !spinningInterval) {
        statesSpinning(true)
        document.querySelector('.states-progress_list').children[0].classList.add('active')
    }
  
    // Скрытие ссылки
    if (!hiddenLink && scrollY >= 400) {
        hiddenLink = true;
        document.querySelector('.welcome_player').classList.remove('shown');
        setTimeout(() => {
            document.querySelector('.welcome_player').classList.add('hidden');
        }, 500);
    }

    if (!headerState && scrollY >= nextSectionY) {
        header.classList.add('shrink');
        headerState = true;
    } else if (headerState && scrollY < nextSectionY) {
        header.classList.remove('shrink');
        headerState = false;
    }
}
document.addEventListener('scroll', throttle(handleScroll, 125));

window.onresize = () => {
    nextSectionY = document.querySelector('.why-us').offsetHeight;
    stateSectionY = document.querySelector('section.states').offsetHeight;
}

let currentState = 0;
let appearTimer;

function previewState(number, delay) {
    document.querySelector('.state-poster').classList.add('disappear');
    document.querySelector('.state-poster-top_layer').classList.add('disappear');
    document.querySelector('.state-name').classList.add('disappear');
    document.querySelector('.map-card img').classList.add('disappear');
    document.querySelector('.description-card').classList.add('disappear');

    if (delay == undefined) {
        delay = 750;
    }

    currentState = number;
    if (document.querySelector('.states-progress_list div.active')) {
        document.querySelector('.states-progress_list div.active').classList.remove('active');
    }
    if (document.querySelector('.states-list li.selected')) {
        document.querySelector('.states-list li.selected').classList.remove('selected');
    }

    if (document.querySelector('.state-emojis.shown')) {
        document.querySelector('.state-emojis.shown').classList.remove('shown');
    }
    
    if (document.querySelector('.states-progress_list div.preview')) {
        document.querySelector('.states-progress_list div.preview').classList.remove('preview');
    }

    document.querySelectorAll('.states-list li')[currentState].classList.add('selected');
    document.querySelectorAll('.states-progress_list div')[currentState].classList.add('preview');

    appearTimer = setTimeout(() => {
        let poster = document.querySelector('.state-poster');
        let state_name = document.querySelector('.state-name');
        let state = states[currentState];
        let map = document.querySelector('.map-card img');

        document.querySelectorAll('.states-progress_list div')[currentState].classList.add('active');
        document.querySelector('.states-progress_list div.preview').classList.remove('preview');


        let topLayer = '';
        if (state.posterTopLayer) {
            topLayer = `<img src='images/statePosters/${state.posterTopLayer}'>`;
        }
        poster.innerHTML = `
            <img src='images/statePosters/${state.poster}'>
        `;
        document.querySelector('.state-poster-top_layer').innerHTML = `
            ${topLayer}
        `;

        state_name.innerText = state.name;
        document.querySelector('.state-description').innerHTML = state.description;
        map.src = `images/maps/${state.map.image}`;
        document.querySelector('.map-button').href = state.map.link;
        document.querySelector('.mobile-map_link').href = state.map.link;

        document.querySelector('.state-learn_more a').href = state.link;
        document.querySelector('.mobile-learn_more').href = state.link;

        poster.classList.remove('disappear');
        document.querySelector('.state-poster-top_layer').classList.remove('disappear');

        state_name.classList.remove('disappear');
        map.classList.remove('disappear');
        document.querySelector('.description-card').classList.remove('disappear');
        document.querySelector('.state-emojis.'+state.codeName).classList.add('shown');
    }, delay);
}

let spinningInterval;

function statesSpinning(status) {
    clearInterval(spinningInterval);
    
    if (!status) {
        return;
    }

    spinningInterval = setInterval(() => {
        currentState++;
        if (currentState >= states.length) {
            currentState = 0;
        }
        previewState(currentState);
    }, 9000);
}

function switchState(direction) {
    clearTimeout(appearTimer);
    currentState = Number(currentState + direction);
    if (currentState >= states.length) {
        currentState = 0;
    }
    if (currentState < 0) {
        currentState = states.length - 1;
    }

    statesSpinning(false);
    previewState(currentState, 500);
    statesSpinning(true);
}

document.querySelector('.button-previous_state').addEventListener('click', () => {
    switchState(-1);
});
document.querySelector('.button-next_state').addEventListener('click', () => {
    switchState(1);
});

function loadStatesList() {
    document.querySelector('.states-list').innerHTML = ``;
    for (let i in states) {
        let item = document.createElement('li');
        item.innerText = states[i].name;
        item.onclick = function () {
            currentState = i;
            clearTimeout(appearTimer);
            previewState(i, 500);
            statesSpinning(true);
        }
        document.querySelector('.states-list').appendChild(item);
    }
    document.querySelector('.states-list li').classList.add('selected');
}
loadStatesList();

if (localStorage.getItem('showStatusLink') == 'true') {
    document.querySelector('.welcome_player').classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('.welcome_player').classList.add('shown');
    }, 350);
}