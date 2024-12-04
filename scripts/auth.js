var api_url = 'request/';
if (localStorage.getItem('debug') == 'true') { api_url = 'https://demovio.lol/request/'; }
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


async function login() {
    try {
        let name = document.querySelector(`.input-name`).value;
        let password = document.querySelector(`.input-password`).value;

        document.querySelector('.submit').disabled = true;

        const response = await fetch(`${api_url}login.php`, {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            password: password,
          })
        })
        
        const result = await response.text();
    
        if (result == "logged_in") {
          document.querySelector('.submit').disabled = null;
          window.open('status', '_self');
        } else if (result == "wrong_credentials") {
            showPopup('Неверные имя либо пароль.');
            document.querySelector('.submit').disabled = null;
        }
    } catch (error) {
      console.error('Error: ', error)
      //showWarning(error);
    }
}

var currentScreen = 'credentials';
function showScreen(name) {
  let screens = document.querySelectorAll('.screen');
  for(let i=0; i<screens.length; i++) {
    screens[i].classList.add('hidden');
  }
  document.querySelector(`.screen-${name}`).classList.remove('hidden');
  currentScreen = name;
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
  }, 8000);
}
function isValidMinecraftNickname (nickname) {
  const regex = /^[a-zA-Z_][a-zA-Z0-9_]{2,15}$/
  return regex.test(nickname)
}
function isValidTelegramUsername (username) {
  const regex = /^(?!_)(?!.*__)[a-zA-Z0-9_]{5,32}(?<!_)$/
  return regex.test(username)
}

async function checkForWhitelist() {
  let name = document.querySelector(`.input-name`).value;
  if (!isValidMinecraftNickname(name)) {
    showPopup('Неправильный формат имени игрока. Проверьте правильность написания (только латиница)', 'error');
    return;
  }

  try {
    document.querySelector('.submit-name').disabled = true;
    const response = await fetch(`${api_url}whitelistCheck.php`, {
      method: 'POST',
      body: JSON.stringify({
        name: name
      })
    })
    const result = await response.text();
    console.log(result);

    if (result == "1") {
      showPopup('Вы есть в белом списке! Ваш аккаунт будет активирован сразу после завершения регистрации.', 'ok');
      showScreen('password');
    } else if (result == "") {
      showPopup('Вас нет в белом списке. Вы сможете создать аккаунт, но его придётся подтвердить у администратора.', 'warn');
      showScreen('password');
    } else if (result == "account_already_created") {
      showPopup('Этот игровой ник уже занят. Попробуйте войти в аккаунт.', 'error');
      document.querySelector('.submit-name').disabled = null;
      return;
    }
    playerName = name;

    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
    });
  } catch (error) {
    console.error('Error: ', error);
  }
}
function passwordWarning(value) {
  let warn = document.querySelector('.warn_password');
  if (value == undefined) {
    warn.classList.add('hidden');
    return;
  }
  warn.classList.remove('hidden');
  warn.innerText = value;
}
function checkPassword() {
  let pass = document.querySelector('.input-password').value;
  let repeat_pass = document.querySelector('.input-password_repeat').value;
  if (pass != repeat_pass) {
    passwordWarning('Пароли не совпадают. Введите во втором поле тот же пароль, что и в первом.');
    return;
  }
  if (!(pass.length >= 8 && pass.length <= 32)) {
    passwordWarning('Длина пароля должна быть минимум 8 символов и максимум 32 символа.');
    return;
  }

  showScreen('license');
}

var isLicensed = false;
var playerName = undefined;
var currentPreview = "";
let wrongSkins = [];
let checkedCurrentSkin = false;
function handleSkinPreview() {
  let skin_preview = document.querySelector('.skin-preview');
  let skin_preview_desktop = document.querySelector('.background-skin-preview img');
  let skin_name = 'Steve1';
  if (isLicensed && !wrongSkins.includes(playerName)) {
    skin_name = playerName;
  }

  let input_value = document.querySelector('.input-skin').value;
  let trimmed_value = input_value.trim();
  if (trimmed_value.length != 0 && !wrongSkins.includes(trimmed_value)) {
    skin_name = input_value.trim();
  }

  currentPreview = skin_name;

  skin_preview.src = `https://api.mcheads.org/iosbody/${skin_name}.png`;
  skin_preview_desktop.src = `https://api.mcheads.org/iosbody/${skin_name}.png`;
}
let debounceTimeout;
document.querySelector('.input-skin').addEventListener('input', () => {
  clearTimeout(debounceTimeout)
  checkedCurrentSkin = false;
  debounceTimeout = setTimeout(() => {
    handleSkinPreview()
  }, 500);
});
document.querySelector('.skin-preview').addEventListener('error', (e) => {
  if (currentPreview != 'Steve1') {
    wrongSkins[wrongSkins.length] = currentPreview;
  }
  handleSkinPreview();
});
document.querySelector('.skin-preview').addEventListener('load', (e) => {
  checkedCurrentSkin = true;
});

function setLicenseAvailability(value) {
  let text = document.querySelector('.screen-skin .text-description');
  let skin_input = document.querySelector('.input-skin');
  if (value == true) {
    text.innerHTML = `Вам необязательно выбирать скин игрока, так как у вас есть лицензия игры. Если вы всё равно хотите его сменить, то подберите желаемый скин на сайте <a href="https://skinmc.net">skinmc.net</a>.`;
  } else {
    text.innerHTML = `Подберите скин на <a href="https://skinmc.net">skinmc.net</a>, чтобы придать уникальности вашему персонажу. 
                Так другие игроки смогут различать вас.`;
  }
  isLicensed = value;
  handleSkinPreview();

  showScreen('skin');
}

var selectedSkin;
function saveSkin(doSkip) {
  if (doSkip) {
    document.querySelector('.input-skin').value = "";
    document.querySelector('.input-skin').disabled = "true";
    handleSkinPreview();
    selectedSkin = "";
    showScreen('citizenship');

    return;
  }
  let inputValue = currentPreview.trim();
  if (!checkedCurrentSkin) {
    return;
  }
  if (document.querySelector('.input-skin').value.trim().length == 0) {
    showPopup('Введите ник скина, который вы хотите применить, либо пропустите данный этап.', 'warn');
    return;
  }
  if (wrongSkins.includes(inputValue) || inputValue === 'Steve1') {
    showPopup('Вы ввели несуществующий скин. Проверьте правильность введённого ника.', 'warn');
    return;
  }

  selectedSkin = currentPreview.trim();
  showScreen('citizenship');
}

let lastKnownScrollPosition = 0;
let ticking = false;

function inRange(value, from, to) {
  return value >= from && value <= to;
}

var selectedState = 0;
var cardHeight = 248;
const states = ['Нью Йорк', 'Калифорния', '', 'Шанхай', 'Огайо', 'Джорджия'];
var selectedCitizenship;

function handleScrollStatus(pos) {
  let num = Math.floor((pos + cardHeight / 2) / cardHeight);
  num = clamp(num, 0, states.length - 1);

  let dots = document.querySelector('.dots').children;
  
  for (let i=0; i < dots.length; i++) {
    dots[i].className = '';
  }
  document.querySelector('.dots').children[num].className = 'active';
  selectedState = num;

  if (num == 2) {
    document.querySelector('.submit-state').innerText = `Выберите штат`;
    document.querySelector('.submit-state').disabled = `true`;
    return;
  }
  document.querySelector('.submit-state').disabled = null;
  document.querySelector('.submit-state').innerText = `Выбрать (${states[num]})`;
}

document.querySelector('.state-picker .list').scrollTop = cardHeight * 2;
document.querySelector('.state-picker .list').addEventListener('scroll', () => {
  lastKnownScrollPosition = document.querySelector('.state-picker .list').scrollTop;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScrollStatus(lastKnownScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
});

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function saveCitizenship() {
  showScreen('contact');
  let code = "GE";
  switch (selectedState) {
    case 0:
      code = 'NY';
      break;
    case 1:
      code = 'CA';
      break;
    case 3:
      code = 'SH';
      break;
    case 4:
      code = 'OH';
      break;
  }

  selectedCitizenship = {
    code: code,
    date: formatDate(new Date()),
    protocol: `№0${selectedState}:${randomNum(1000,9999)}`,
    address: '-'
  };
}

async function requestSignup() {
  let contact = document.querySelector('.input-contact').value.trim().replaceAll('@', '');
  let pronouns = document.querySelector('.input-pronouns').value.trim();

  if (!isValidTelegramUsername(contact)) {
    showPopup('Вы указали неправильный формат имени Telegram. Проверьте правильность его написания', 'error');
    return;
  }
  if (pronouns.length > 24) {
    showPopup('Вы указали слишком длинные местоимения (максимум 24 символа)', 'error');
    return;
  }
  showScreen('request');
  window.removeEventListener('beforeunload', (event) => {
    event.preventDefault();
  });
  try {
      let password = document.querySelector(`.input-password`).value;

      const response = await fetch(`${api_url}signup.php`, {
        method: 'POST',
        body: JSON.stringify({
          name: playerName,
          password: password,
          skin: selectedSkin,
          citizenship: JSON.stringify(selectedCitizenship),
          pronouns: pronouns,
          contact: contact
        })
      })
      
      const result = await response.text();
      console.log(result);

      if (result == 'created') {
        showScreen('passport');
      } else {
        showScreen('error');
        document.querySelector('.screen-error .text-description').innerHTML = `
          Произошла ошибка при регистрации аккаунта. Код ошибки: ${result}. 
          Обратитесь к <a href="https://t.me/devio101">администратору</a> за помощью.
        `;
      }

  } catch (error) {
    console.error('Error: ', error)
  }
}