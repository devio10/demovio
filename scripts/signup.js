function isValidMinecraftNickname(nickname) {
    const regex = /^[a-zA-Z_][a-zA-Z0-9_]{2,15}$/
    return regex.test(nickname)
}
function isValidTelegramUsername(username) {
    const regex = /^(?!_)(?!.*__)[a-zA-Z0-9_]{5,32}(?<!_)$/
    return regex.test(username)
}
var isWhitelisted;
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
        if (result == "1") {
            showPopup('Вы есть в белом списке! Ваш аккаунт будет активирован сразу после завершения регистрации.', 'ok');
            isWhitelisted = true;
            showScreen('password');
        } else if (result == "") {
            showPopup('Вас нет в белом списке. Вы сможете создать аккаунт, но его придётся подтвердить у администратора.', 'warn');
            isWhitelisted = false;
            showScreen('password');
        } else if (result == "account_already_created") {
            showPopup('Этот игровой ник уже занят. Попробуйте войти в аккаунт.', 'error');
            document.querySelector('.submit-name').disabled = null;
            return;
        }
        playerName = name;
        document.querySelector('.submit-name').disabled = null;
        window.addEventListener('beforeunload', beforeUnloadHandler);
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


let lastKnownScrollPosition = 0;
let ticking = false;

var selectedState = 0;
var cardHeight = 248;
const states = ['Нью Йорк', 'Калифорния', '', 'Шанхай', 'Огайо', 'Джорджия'];
const state_links = ['newyork', 'california', '', 'shanghai', 'ohio', 'georgia'];
var selectedCitizenship;

function handleScrollStatus(pos) {
    cardHeight = document.querySelector('.state-picker .state').offsetHeight;
    let num = Math.floor((pos + cardHeight / 2) / cardHeight);
    num = clamp(num, 0, states.length - 1);

    let dots = document.querySelector('.dots').children;

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = '';
    }
    document.querySelector('.dots').children[num].className = 'active';
    selectedState = num;

    if (num === 2) {
        document.querySelector('.submit-state').innerText = `Выберите штат`;
        document.querySelector('.submit-state').disabled = `true`;
        document.querySelector('.state-info').innerHTML = `Информацию о штатах вы можете узнать <a href="/">здесь</a>.`;
        return;
    }

    if (num === 3) {
        //Временное приостановление набора в Шанхай
        document.querySelector('.submit-state').innerText = `Недоступно`;
        document.querySelector('.submit-state').disabled = `true`;
        document.querySelector('.state-info').innerHTML = `Этот штат временно перестал набирать новых граждан.`;
        return;
    }
    document.querySelector('.submit-state').disabled = null;
    document.querySelector('.submit-state').innerText = `Выбрать (${states[num]})`;
    document.querySelector('.state-info').innerHTML = `Информацию об этом штате вы можете узнать <a href="${state_links[num]}">здесь</a>.`;
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
    showScreen('pronouns');
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
        protocol: `№0${selectedState}:${randomNum(1000, 9999)}`,
        address: '-'
    };
}
var pronouns;
function choosePronouns(value) {
    pronouns = value;
    if (pronouns === false) {
        document.querySelector('.input-pronouns').classList.add('shown');
    } else {
        document.querySelector('.input-pronouns').classList.remove('shown');
    }
}

function savePronouns() {
    if (pronouns !== false && pronouns !== "" && !pronouns) {
        return;
    }
    if (pronouns !== false) {
        showScreen('contact');
        return;
    }
    let customValue = document.querySelector('.input-pronouns').value.trim();
    if (customValue.length < 4 || customValue.length > 16) {
        showPopup('Ваши местоимения должны быть длиной от 4 до 16 символов', 'error');
        return;
    }

    showScreen('contact');
}

function beforeUnloadHandler(event) {
    event.preventDefault();
}

async function requestSignup() {
    let contact = document.querySelector('.input-contact').value.trim().replaceAll('@', '');
    let imageFile = 0;
    if (loadedImage !== 0) {
        imageFile = loadedImage.split(',')[1];
    }

    if (!isValidTelegramUsername(contact)) {
        showPopup('Вы указали неправильный формат имени Telegram. Проверьте правильность его написания', 'error');
        return;
    }
    showScreen('request');
    window.removeEventListener('beforeunload', beforeUnloadHandler);
    document.querySelector('.header-back_button').disabled = 'true';
    try {
        let password = document.querySelector(`.input-password`).value;

        const response = await fetch(`${api_url}signup.php`, {
            method: 'POST',
            body: JSON.stringify({
                name: playerName,
                password: password,
                skin: selectedSkin,
                skinType: skinType,
                file: imageFile,
                citizenship: JSON.stringify(selectedCitizenship),
                pronouns: pronouns,
                contact: contact
            })
        })

        const result = await response.text();

        if (result === 'created' || result === 'created_noskin') {
            showScreen('passport');
            localStorage.setItem('redirect', 'true');
            if (!isWhitelisted) {
                document.querySelector('.screen-passport h1').innerText = 'Регистрация завершена';
                document.querySelector('.new-passport').style.display = 'none';
                document.querySelector('.screen-passport button').innerText = 'Готово';
            }
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
showScreen(screens[0]);
// showScreen('citizenship');