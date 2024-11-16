import { states } from "./states.js";
let nextSectionY = document.querySelector('.why-us').offsetHeight;

window.onresize = () => {
    nextSectionY = document.querySelector('.why-us').offsetHeight;
}

const header = document.querySelector('header');
document.addEventListener('scroll', () => {
    if (window.scrollY >= nextSectionY) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

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

    console.log(currentState);
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
            topLayer = `<img src='img/statePosters/${state.posterTopLayer}'>`;
        }
        poster.innerHTML = `
            <img src='img/statePosters/${state.poster}'>
        `;
        document.querySelector('.state-poster-top_layer').innerHTML = `
            ${topLayer}
        `;

        state_name.innerText = state.name;
        document.querySelector('.state-description').innerHTML = state.description;
        map.src = `img/maps/${state.map.image}`;
        document.querySelector('.map-button').href = state.map.link;

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
statesSpinning(true);

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