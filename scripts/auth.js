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


async function login() {
    try {
        let name = document.querySelector(`.input-name`).value;
        let password = document.querySelector(`.input-password`).value;

        document.querySelector('.submit').disabled = true;

        const response = await fetch('php/login.php', {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            password: password,
          })
        })
        
        const result = await response.text();
        console.log(result);
    
        if (result == "logged_in") {
          window.open('index.html', '_self');
        } else if (result == "wrong_credentials") {
            //showWarning(result_json.error);
            console.log("wrong credentials");
            document.querySelector('.submit').disabled = "false";
        }
    } catch (error) {
      console.error('Error: ', error)
      //showWarning(error);
    }
}
function logout() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        window.open('about.html', '_self');
    } else {
        console.error('Request failed with status ', xhr.status);
    }
    };

    let url = 'php/logout.php';
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
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
function showPopup(text) {
  let popup = document.querySelector('.popup');
  popup.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="#4ade80" viewBox="0 0 256 256"><path d="M246.15,65.46l-.07-.08L222.15,41.85a20,20,0,0,0-28.23-.05l-90,88.83L70.06,97.78a20,20,0,0,0-28.21.08l-24,24a20,20,0,0,0,0,28.26l71.62,72a20,20,0,0,0,28.29,0L246.15,93.74A20,20,0,0,0,246.15,65.46ZM103.61,202.33,37.64,136,56,117.61,95.65,156a12,12,0,0,0,16.78-.08L208,61.61l18.32,18Z"></path></svg>
    <span>${text}</span>
  `;
  popup.classList.remove('hidden');
  setTimeout(() => {
    popup.classList.add('hidden');
  }, 8000);
}

async function checkForWhitelist() {

  try {
    let name = document.querySelector(`.input-name`).value;
    document.querySelector('.submit-name').disabled = true;
    const response = await fetch('https://demovio.lol/whitelistCheck.php', {
      method: 'POST',
      body: JSON.stringify({
        name: name
      })
    })
    const result = await response.text();
    console.log(result);

    if (result == "1") {
      showPopup('Вы есть в белом списке! Ваш аккаунт будет активирован сразу после завершения регистрации.');
      showScreen('password');
    } else if (result == "") {
      showPopup('Вас нет в белом списке. Вы сможете создать аккаунт, но его придётся подтвердить у администратора.');
      showScreen('password');
    } else if (result == "account_already_created") {
      showPopup('Этот игровой ник уже занят. Попробуйте войти в аккаунт.');
      document.querySelector('.submit-name').disabled = null;
    }
    playerName = name;
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
function handleSkinPreview() {
  let skin_preview = document.querySelector('.skin-preview');
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
}
let debounceTimeout;
document.querySelector('.input-skin').addEventListener('input', () => {
  clearTimeout(debounceTimeout)
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
  console.log(inputValue);
  if (document.querySelector('.input-skin').value.trim().length == 0) {
    showPopup('Введите ник скина, который вы хотите применить, либо пропустите данный этап.');
    return;
  }
  if (wrongSkins.includes(inputValue) || inputValue === 'Steve1') {
    showPopup('Вы ввели несуществующий скин. Проверьте правильность введённого ника.');
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
  
  let num = Math.max(0, Math.floor((pos + cardHeight / 2) / cardHeight));

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
  showScreen('request');
  try {
      let password = document.querySelector(`.input-password`).value;

      const response = await fetch('https://demovio.lol/signup.php', {
        method: 'POST',
        body: JSON.stringify({
          name: playerName,
          password: password,
          skin: selectedSkin,
          citizenship: JSON.stringify(selectedCitizenship),
          pronouns: document.querySelector('.input-pronouns').value.trim(),
          contact: document.querySelector('.input-contact').value.trim().replaceAll('@', '')
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