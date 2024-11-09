const items = document.querySelectorAll('button.card');
const screens = ['titlescreen', 'players', 'passport', 'stats', 'download'];

items.forEach((item, index) => {
  const delay = index * (1000 / items.length);
  item.style.animationDelay = `${delay}ms`;
});
setTimeout(() => {
    document.querySelector('.cards-container').classList.add('grayed');

    items.forEach((item) => {
        item.style.animationDelay = `0s`;
        item.disabled = null;
    });
}, 1500);

document.querySelector('.show_stack').addEventListener('mouseenter', function() {
    document.querySelector('.stack_hint').classList.remove('hidden');
    document.querySelector('.menu_glowing').classList.remove('hidden');
});
document.querySelector('.show_stack').addEventListener('mouseleave', function() {
    document.querySelector('.stack_hint').classList.add('hidden');
    document.querySelector('.menu_glowing').classList.add('hidden');
});
let pageState = 0;

function resetBackground() {
    let content = document.querySelector('.page-backgrounds').innerHTML;

    document.querySelector('.page-backgrounds').innerHTML = '';
    setTimeout(() => {
        document.querySelector('.page-backgrounds').innerHTML = content;
    }, 1);
}

function openCards() {
    screens.forEach((screenName) => {
        document.querySelector(`.screen-${screenName}`).classList.add('hidden');
        document.querySelector(`#bg-${screenName}`).classList.add('hiding');
    });

    document.querySelector('.show_stack').classList.add('hidden');
    document.querySelector('.stack_hint').classList.add('hidden');
    document.querySelector('.menu_glowing').classList.add('hidden');


    document.querySelector('body').classList.remove('black');
    document.querySelector('.page-backgrounds').classList.add('hidden');

    document.querySelector('.cards-stack').classList.remove('hidden');
    document.querySelector('.cards-container').classList.add('reappear');
    document.querySelector('.cards-container').classList.remove('grayed');


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
        screens.forEach((screenName) => {
            document.querySelector(`#bg-${screenName}`).classList.remove('hiding');
            document.querySelector(`#bg-${screenName}`).classList.add('hidden');
        });
        resetBackground();
    }, 500);
}
document.querySelector('.show_stack').addEventListener('click', openCards);

function openScreen(value) {
    screens.forEach((screenName) => {
        document.querySelector(`.screen-${screenName}`).classList.add('hidden');
        document.querySelector(`#bg-${screenName}`).classList.add('hidden');
    });

        document.querySelector(`#bg-${value}`).classList.remove('hidden');
        document.querySelector(`#bg-${value}`).classList.remove('hiding');
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

    document.querySelector('.cards-stack').classList.add('hidden');
    document.querySelector('.page-backgrounds').classList.remove('hidden');
    document.querySelector('.show_stack').classList.remove('hidden');
    pageState = 1;
}
function openHelpSection(element) {
    let parent = element.parentElement;
    let doClose = false;
    if (parent.classList.contains('opened')) { doClose = true; }
    if (document.querySelector('.help-section.opened')) {
        document.querySelector('.help-section.opened').classList.remove('opened');
    }
    if (!doClose) { parent.classList.add('opened'); }
}

function getFullHeight(element) {
    const originalStyle = element.style.cssText;
    element.style.display = 'flex';
  
    const height = element.offsetHeight;
    element.style.cssText = originalStyle;
  
    return height;
}

function setHelpSectionsHeight() {
    for (let section of document.querySelectorAll('.help-section-content')) {
        section.style.setProperty('--height', `${getFullHeight(section)}px`);
        section.classList.add('handled');
    }
}

const waitUntilImagesLoad = (element) => {
    return new Promise((resolve) => {
      const images = element.querySelectorAll('img');
      let loadedImagesCount = 0
  
      if (images.length === 0) {
        resolve(element.scrollHeight);
        return
      }
  
      images.forEach((img) => {
        if (img.complete) {
          loadedImagesCount++
          if (loadedImagesCount === images.length) {
            resolve(element.scrollHeight)
          }
        } else {
          img.addEventListener('load', () => {
            loadedImagesCount++
        console.log(loadedImagesCount);

            if (loadedImagesCount === images.length) {
              resolve(element.scrollHeight)
            }
          })
          
          img.addEventListener('error', () => {
            loadedImagesCount++
            if (loadedImagesCount === images.length) {
              resolve(element.scrollHeight)
            }
          })
        }

      })
    })
  }
waitUntilImagesLoad(document.querySelector('.screen-download')).then(() => {
    console.log('start');
    setHelpSectionsHeight();
})
