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

function showScreen(name) {
  let screens = document.querySelectorAll('.screen');
  for(let i=0; i<screens.length; i++) {
    screens[i].classList.add('hidden');
  }
  document.querySelector(`.screen-${name}`).classList.remove('hidden');
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
  showScreen('password');

  let player_name = document.querySelector('.input-name').value;
  if (player_name == 'devio10') {
    showPopup('Вы есть в белом списке! Ваш аккаунт будет активирован сразу после завершения регистрации.');
  } else {
    showPopup('Вас нет в белом списке. Вы сможете создать аккаунт, но его придётся подтвердить у администратора.');
  }
}

let lastKnownScrollPosition = 0;
let ticking = false;

function inRange(value, from, to) {
  return value >= from && value <= to;
}

var selectedState = 0;
var cardHeight = 248;
const states = ['Нью Йорк', 'Калифорния', '', 'Шанхай', 'Огайо', 'Джорджия'];

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