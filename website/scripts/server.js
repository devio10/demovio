var players_online = [];
var api_url = 'request/';
if (localStorage.getItem('develop') == 'true') { api_url = 'https://demovio.love/request/'; }
let statusTimer;

function checkStatus() {
    let status_obj = document.querySelector('.server-status');

    let xhr = new XMLHttpRequest();
    
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        if (xhr.responseText == "offline") {
            status_obj.innerHTML = 'Сервер оффлайн';
            document.querySelector('.server-players').style.display = 'none';
            statusTimer = setTimeout(() => {
                checkStatus();
            }, 30000);
            return;
        }
        status_obj.innerHTML = 'Сервер онлайн';
        players_online = [];
        if (xhr.responseText != 0) {
            players_online = xhr.responseText.split(',');
        }
        document.querySelector('.server-players').style.display = 'block';

        document.querySelector('.server-players').innerText = getPlayerCountText(players_online);

        statusTimer = setTimeout(() => {
            checkStatus();
        }, 10000);
    } else {
        statusTimer = setTimeout(() => {
            checkStatus();
        }, 30000);
        status_obj.innerHTML = 'Сервер оффлайн';
        console.error('Request failed with status ', xhr.status);
        
    }
    };

    let url = `${api_url}status.php`;
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'text/plain');

    xhr.send();
}
checkStatus();

function forceRefresh() {
    clearTimeout(statusTimer);
    document.querySelector('.server-status').innerHTML = 'Обновление...';
    checkStatus();
    playersList();
}

function getPlayerSkinURL(value, className) {
    let path = `https://mc-heads.net/avatar/${value}/42.png`;
    if (className === undefined) {
        className = '';
    }
    if (value.includes('skins/')) {
        path = `https://demovio.love/${value}`;
        return `<div class="custom_skin ${className}" style="background-image: url(${path})"></div>`;
    }
    return `<img src="${path}" class="${className}">`;
}

function playersList() {
    let list = document.querySelector('.players-list');
    list.innerHTML = `
        <div class="list_loading">
            <div class="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    `;

    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        let data = JSON.parse(xhr.responseText);
        console.log(data);
        list.innerHTML = '';

        if (data.error) {

            let warn = `Не удалось загрузить список`;
            if (data.error === 'Not Authorised') {
                warn = 'Подтвердите аккаунт, чтобы посмотреть список';
            }
            list.innerHTML = `
            <div class="players_list-error">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M100,54V40a12,12,0,0,1,12-12h32a12,12,0,0,1,12,12V72a12,12,0,0,1-12,12H127.61a4,4,0,0,1,0-8H144a4,4,0,0,0,4-4V40a4,4,0,0,0-4-4H112a4,4,0,0,0-4,4V54a4,4,0,0,1-8,0ZM211,213.31a4,4,0,1,1-5.92,5.38L119,124H68v40H80a12,12,0,0,1,12,12v32a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V176a12,12,0,0,1,12-12H60V124H24a4,4,0,0,1,0-8h87.68L45,42.69A4,4,0,0,1,51,37.31ZM80,172H48a4,4,0,0,0-4,4v32a4,4,0,0,0,4,4H80a4,4,0,0,0,4-4V176A4,4,0,0,0,80,172Zm152-56H164a4,4,0,0,0,0,8h24v26.83a4,4,0,1,0,8,0V124h36a4,4,0,0,0,0-8Z"></path></svg>
                <span>${warn}</span>
            </div>
            `;
            throw new Error(data.error);
        }

        for(let i=0; i<data.length; i++) {
            let debugMode = false;
            let player_citizenship;
            if (data[i].hasOwnProperty('isActivated') && localStorage.getItem('debug') == 'true') {
                debugMode = true;
                player_citizenship = JSON.parse(data[i].citizenship);
            }
            let skin = data[i].skin;
            if (skin == "") {
                skin = data[i].name;
            }
            let online_status = '';
            if (players_online.includes(data[i].name)) {
                online_status = `<div class="online_dot"></div>`;
            }

            let card = document.createElement('li');
            let contact = "";
            
            if (data[i].contact != undefined && user != undefined && user.isActivated == 1) {
                contact = `
                    <a href="https://t.me/${data[i].contact}"> <img src="images/message.svg"> </a>
                `;
            }

            let pronouns = "";
            if (data[i].pronouns != undefined) {
                pronouns = `<span class="pronouns">${data[i].pronouns}</span>`;
            }
            let player_name = data[i].name;
            let activationClass = '';
            let moreOptions = '';
            if (debugMode) {
                // player_name = `${data[i].name} (${player_citizenship.code})`;
                pronouns = `<span class="pronouns">${data[i].pronouns} (${player_citizenship.code})</span>`;

                if (data[i].isActivated == 0) {
                    activationClass = `not_activated`;
                }
                moreOptions = `
                    <a class="players-more_options" onclick="playerOptions(event, '${data[i].name}', '${data[i].isActivated}', ${data[i].isBanned})"> <img src="images/more.svg"> </a>
                `;

                if (data[i].isBanned == 1) {
                    card.classList.add('banned');
                    activationClass = `banned`;
                }
            }
            card.innerHTML = `
                ${getPlayerSkinURL(skin, activationClass)}
                <div>
                    <span class="name">${player_name}${online_status}</span>
                    ${pronouns}
                </div>
                ${contact}
                ${moreOptions}
            `;
            if (card.querySelector('img')) {
                card.querySelector('img').addEventListener('error', (e) => {
                    e.target.src = 'images/head_default.png';
                });
            }
            
            if (online_status == "") {
                list.appendChild(card);
            } else {
                list.prepend(card);
            }
        }
    } else {
        console.error('Request failed with status ', xhr.status);
    }
    };

    let url = `${api_url}players.php`;
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}

function nameCode(length, symbol, input) {
    return input.length >= length ? input.slice(0, length) : input.padEnd(length, symbol)
}

var user;
var userSkin;
async function retrieveUserData() {
    try {
        const response = await fetch(`${api_url}userdata.php`, {
          method: 'GET'
        })
        
        const result = await response.json();
        if (result.error) {
            throw new Error(result.error);
        }
        user = {
            id: result[0],
            name: result[1],
            skin: result[2],
            citizenship: result[3],
            pronouns: result[4],
            contact: result[5],
            issueDate: result[6],
            isActivated: result[7]
        };

        localStorage.setItem('showStatusLink', 'true');

        if (localStorage.getItem('redirect') === null) {
            localStorage.setItem('redirect', 'true');
        }

        document.querySelector('.welcome_player').classList.add('shown');
        document.querySelector('.header-user_button').disabled = null;

        if (user.name !== 'devio10') {
            document.querySelector('.context-backstage').remove();
        }

        userSkin = user.name;
        if (user.skin.length > 0) {
            userSkin = user.skin;
        }

        document.querySelector('.welcome_player').innerHTML = `
            <span>Добро пожаловать, ${user.name}!</span>    
            ${getPlayerSkinURL(userSkin)}
        `;
        
        if (user.isActivated != 1) {
            document.querySelector('.no_passports').style.display = 'block';
            document.querySelector('.user-passport').style.display = 'none';
            showAnnouncement(annoucementNotActivated);
            localStorage.setItem('notActivated', 'true');
            document.querySelector('.no_passports').innerText = 'Аккаунт не активирован';
            return;
        }

        if (localStorage.getItem('notActivated') == 'true') {
            
            showAnnouncement(announcementActivated);
        }
        /* PASSPORT */
        let citizenship = JSON.parse(user.citizenship);
        let cit_name = 'Калифорния / California';
        let alt_name = 'CALIFORN';
        let default_poster = 'california-4';
        
        let logoObj = document.querySelector('.citizenship-logo');
        switch (citizenship.code) {
            case "SH":
                cit_name = '上海 / Shanghai / Шанхай';
                alt_name = 'SHANGHAI';
                default_poster = 'shanghainew-1';
                logoObj.onclick = function() {
                    window.open('https://youtu.be/tt9V570H6zc?si=XZzqAOzEToR8aOtH');
                };
                break;
            case "NY":
                cit_name = 'Нью Йорк / New York';
                alt_name = '>NEWYORK';
                default_poster = 'newyork-1';
                logoObj.onclick = function() {
                    window.open('https://youtu.be/ddJqNY__9U8?si=15bOgth5isRzVJkf');
                }
                break;
            case "OH":
                cit_name = 'Огайо / Ohio';
                alt_name = '>OHIO>>>';
                default_poster = 'ohio-1';
                logoObj.onclick = function() {
                    window.open('https://youtu.be/WSGjrluqwjc?si=7cqKUJkK_wE0p2_3');
                }
                break;
            case "GE":
                cit_name = 'Джорджия / Georgia';
                default_poster = 'georgia-1';
                alt_name = 'GEORGIA>';
                break;
            case "CD":
                cit_name = 'Конкорд / Concord';
                default_poster = 'california-4';
                alt_name = '>CONCORD';
                break;
        }

        if (!localStorage.getItem('background')) {
            localStorage.setItem('background', default_poster);
        }
        document.documentElement.style.setProperty('--accent', `var(--accent-${citizenship.code})`);

        document.querySelector('.user-citizenship').innerText = cit_name;
        document.querySelector('.user-acceptance').innerText = citizenship.date;
        document.querySelector('.user-address').innerText = citizenship.address;
        document.querySelector('.user-protocol').innerText = citizenship.protocol;

        document.querySelector(`.citizenship-logo`).innerHTML = `<img class="${citizenship.code}" src="images/stateIcons/passport-${citizenship.code}.svg">`;
        document.querySelector(`.passport-country_color`).classList.add(citizenship.code);

        document.querySelector('.user-name').innerText = user.name;
        document.querySelector(`.passport-stamp.${citizenship.code}`).classList.add('shown');
        if (document.querySelector(`.passport-stamp.${citizenship.code} .date`)) {
            document.querySelector(`.passport-stamp.${citizenship.code} .date`).innerText = citizenship.date;
        }


        let user_contact = user.contact;
        if (user_contact.trim().length == 0) {
            user_contact = '-';
        }

        document.querySelector('.user-contact').innerText = '@'+user_contact;
        document.querySelector('.user-issue').innerText = user.issueDate;

        let user_pronouns = user.pronouns;
        if (user_pronouns.trim().length == 0) {
            user_pronouns = '-';
        }
        document.querySelector('.user-pronouns').innerText = user_pronouns;

        document.querySelector('.passport-pictures').innerHTML = `
            <div class="passport-user_pic_container">
                ${getPlayerSkinURL(userSkin, 'passport-user_pic')}
            </div>
            ${getPlayerSkinURL(userSkin, 'passport-user_pic holo')}
        `;

        if (document.querySelector('.passport-pictures img')) {
            document.querySelector('.passport-pictures img').addEventListener('error', (e) => {
                e.target.src = 'images/head_default.png';
                document.querySelectorAll('.passport-pictures img')[1].src = 'images/head_default.png';
            });
        }
        

        let uuid = ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

        try {
            const mojResponse = await fetch(`${api_url}uuid.php?username=${user.name}`, {
                method: 'GET',
            })
            
            const mojResult = await mojResponse.json();

            if (mojResult.hasOwnProperty('errorMessage')) {
                throw new Error('Player has no license');
            }
            uuid = mojResult.id;
        } catch (e) {
            console.log(`Failed to load UUID from Mojang API: ${e}`);
        }

        document.querySelector('.passport-bottom_info span').innerHTML = `
            ${citizenship.code}>${alt_name}>>>${nameCode(7, '>', user.name.toUpperCase())}>>>>>>>>>>>>>>>>>>>>><br>
            >>${uuid}>>>>${nameCode(3, '>', user.id.toString())}>
            `;
        //oo o oooooooo ooo ooooooo
        //oo 32

        if (citizenship.code == 'SH') {
            document.querySelector('.user-citizenship-title').innerHTML = `国籍 / Citizenship`;
            document.querySelector('.user-acceptance-title').innerHTML = `接受日期 / Date of acceptance`;
            document.querySelector('.user-address-title').innerHTML = `居住地址 / Residential address`;
            document.querySelector('.user-protocol-title').innerHTML = `协议 / Protocol`;

            document.querySelector('.user-name-title').innerHTML = `玩家姓名 / Player name`;
            document.querySelector('.user-contact-title').innerHTML = `联系方式 / Contact`;
            document.querySelector('.user-issue-title').innerHTML = `签发日期 / Date of issue`;
            document.querySelector('.user-pronouns-title').innerHTML = `代词 / Pronouns`;
        }

    } catch (error) {
        console.error('Error: ', error);
        // document.querySelector(`.citizenship-logo`).innerHTML = `<img class="CD" src="images/stateIcons/passport-CD.svg">`;
        // document.querySelector(`.passport-country_color`).classList.add('CD');

        document.querySelector('.user-passport').style.display = 'none';
        // document.querySelector(`.passport-stamp.CD`).classList.add('shown');

        document.querySelector('.no_passports').style.display = 'block';
        document.querySelector('.login_button').classList.add('shown');
        document.querySelector('.context-backstage').remove();
    }
}
retrieveUserData();
function logout() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        localStorage.clear();
        window.open('/', '_self');
    } else {
        console.error('Request failed with status ', xhr.status);
    }
    };

    let url = `${api_url}logout.php`;
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}