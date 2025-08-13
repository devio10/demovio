var api_url = 'request/';
if (localStorage.getItem('develop') == 'true') { api_url = 'https://demovio.love/request/'; }
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
function inRange(value, from, to) {
    return value >= from && value <= to;
}
function handleOptions(element) {
    if (element.parentElement.querySelector('.option-button.selected')) {
        element.parentElement.querySelector('.option-button.selected').classList.remove('selected');
    }
    element.classList.add('selected');
}
async function login() {
    try {
        let name = document.querySelector(`.input-name`).value;
        let password = document.querySelector(`.input-password`).value;

        document.querySelector('.submit-button').disabled = true;

        const response = await fetch(`${api_url}login.php`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                password: password,
            })
        })

        const result = await response.text();

        if (result == "logged_in") {
            document.querySelector('.submit-button').disabled = null;
            localStorage.setItem('redirect','true');
            window.location.href = '/status';
        } else if (result == "wrong_credentials") {
            showPopup('Неверные имя либо пароль.', 'warn');
            document.querySelector('.submit-button').disabled = null;
        }
    } catch (error) {
        console.error('Error: ', error)
        //showWarning(error);
    }
}
function showPopup(text, icon) {
    let popup = document.querySelector('.popup');

    let icon_svg;
    switch (icon) {
        case "ok":
            icon_svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="#4ade80" viewBox="0 0 256 256"><path d="M246.15,65.46l-.07-.08L222.15,41.85a20,20,0,0,0-28.23-.05l-90,88.83L70.06,97.78a20,20,0,0,0-28.21.08l-24,24a20,20,0,0,0,0,28.26l71.62,72a20,20,0,0,0,28.29,0L246.15,93.74A20,20,0,0,0,246.15,65.46ZM103.61,202.33,37.64,136,56,117.61,95.65,156a12,12,0,0,0,16.78-.08L208,61.61l18.32,18Z"></path></svg>`;
            break;
        case "error":
            icon_svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="#dc2626" viewBox="0 0 256 256"><path d="M200,128a71.69,71.69,0,0,1-15.78,44.91L83.09,71.78A71.95,71.95,0,0,1,200,128ZM56,128a71.95,71.95,0,0,0,116.91,56.22L71.78,83.09A71.69,71.69,0,0,0,56,128Zm180,0A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-20,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>`;
            break;
        case "warn":
            icon_svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="#fbbf24" viewBox="0 0 256 256"><path d="M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.77,4.77,0,0,1,8,0l87.44,151.87A3.56,3.56,0,0,1,219.46,201.8ZM116,136V104a12,12,0,0,1,24,0v32a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,176Z"></path></svg>`;
            break;
        default:
            icon_svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 256 256"><path d="M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z"></path></svg>`;
    }
    popup.innerHTML = `
    ${icon_svg}
    <span>${text}</span>
  `;
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 5000);
}

var currentScreen = 'credentials';

function initializeScreens() {
    let divs = document.querySelectorAll('.screen') // выбираем все элементы с классом "screen"
    let screenNames = Array.from(divs).map(div => {
        const classList = div.className.split(' ') // разбиваем строку классов на массив
        const screenClass = classList.find(cls => cls.startsWith('screen-') && cls !== 'screen') // находим класс, начинающийся с "screen-"
        return screenClass?.replace('screen-', '') // удаляем префикс "screen-" для получения названия экрана
    }).filter(Boolean) // фильтруем null/undefined значения
    return screenNames;
}
const screens = initializeScreens();

function previousScreen() {
    if (screens[0] === currentScreen) {
        return;
    }

    let currentIndex = screens.indexOf(currentScreen);
    showScreen(screens[currentIndex - 1]);
}

function showScreen(name) {
    let screenElements = document.querySelectorAll('.screen');
    for (let i = 0; i < screenElements.length; i++) {
        screenElements[i].classList.add('hidden');
    }
    document.querySelector(`.screen-${name}`).classList.remove('hidden');
    currentScreen = name;
    let currentIndex = screens.indexOf(currentScreen);
    let currentProgress = ((currentIndex + 1) / (screens.length - 1)) * 100;

    document.querySelector('.background-skin-preview').classList.remove('shown');
    switch (currentScreen) {
        case "passport":
            document.querySelector('.progress').classList.add('hidden');
            break;
        case "error":
            document.querySelector('.progress').classList.add('hidden');
            break;
        case "request":
            currentProgress = 95;
            break;
        case "skin":
            document.querySelector('.background-skin-preview').classList.add('shown');
            break;
    }
    document.querySelector('.progress').style.setProperty('--value', `${currentProgress}%`);
}