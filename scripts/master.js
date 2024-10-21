const items = document.querySelectorAll('button.card');
const screens = ['titlescreen', 'players', 'passport', 'stats', 'download'];
console.log(items)

items.forEach((item, index) => {
  const delay = index * (1000 / items.length);
  item.style.animationDelay = `${delay}ms`;
});
setTimeout(() => {
    document.querySelector('.movies-cards').classList.add('grayed');

    items.forEach((item) => {
        item.style.animationDelay = `0s`;
        item.disabled = null;
    });
}, 1500);

document.querySelector('.show_stack').addEventListener('mouseenter', function() {
    document.querySelector('.stack_hint').classList.remove('hidden');
});
document.querySelector('.show_stack').addEventListener('mouseleave', function() {
    document.querySelector('.stack_hint').classList.add('hidden');
});

let descriptionState = 0;
let pageState = 0;

function toggleDescription() {
    descriptionState = !descriptionState;
    initializeDescription();
}

function initializeDescription() {
    if (descriptionState == 0) {
        document.querySelector('.movies-backgrounds').classList.remove('darken');
        document.querySelector('.show_description').classList.remove('reverse');
        document.querySelector('.movie-description').classList.add('hidden');
        document.querySelector('.movie-ratings').classList.remove('hidden');
    } else {
        document.querySelector('.movies-backgrounds').classList.add('darken');
        document.querySelector('.show_description').classList.add('reverse');
        document.querySelector('.movie-description').classList.remove('hidden');
        document.querySelector('.movie-ratings').classList.add('hidden');
    }
}


function openCards() {
    screens.forEach((screenName) => {
        document.querySelector(`.screen-${screenName}`).classList.add('hidden');
    });

    document.querySelector('.show_stack').classList.add('hidden');
    document.querySelector('.stack_hint').classList.add('hidden');

    document.querySelector('body').classList.remove('black');
    document.querySelector('.movies-backgrounds').classList.add('reverse');

    document.querySelector('.movie-list').classList.remove('hidden');
    document.querySelector('.movies-cards').classList.add('reappear');
    document.querySelector('.movies-cards').classList.remove('grayed');


    items.forEach((item, index) => {
        const delay = index * (1000 / items.length);
        item.style.animationDelay = `${delay}ms`;
        item.disabled = "true";
        item.classList.remove('hiding');
        item.classList.remove('expand');

    });

    setTimeout(() => {
        items.forEach((item) => {
            item.style.animationDelay = `0s`;
            item.disabled = null;
        });
    }, 750);
}
document.querySelector('.show_stack').addEventListener('click', openCards);

function openScreen(value) {
    screens.forEach((screenName) => {
        document.querySelector(`.screen-${screenName}`).classList.add('hidden');
    });

    document.querySelector(`.screen-${value}`).classList.remove('hidden');

    items.forEach((item) => {
        if (!item.classList.contains(value)) {
            item.classList.add('hiding');
        }
        item.style.animationDelay = `0s`;
        item.disabled = "true";
    });
    document.querySelector(`.card.${value}`).classList.add('expand');
    document.querySelector('body').classList.add('black');

    document.querySelector('.movie-list').classList.add('hidden');

    document.querySelector('.show_stack').classList.remove('hidden');
    pageState = 1;
}