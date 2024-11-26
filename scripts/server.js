var players_online = [];

function checkStatus() {
    let status_obj = document.querySelector('.server-status');

    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        if (xhr.responseText == "offline") {
            status_obj.innerHTML = 'Сервер оффлайн';
            return;
        }
        status_obj.innerHTML = 'Сервер онлайн';
        players_online = [];
        if (xhr.responseText != 0) {
            players_online = xhr.responseText.split(',');
        }

        let players_text = 'Сейчас никто не играет';
        if (players_online.length == 1) {
            players_text = `Сейчас играет ${players_online[0]}`;
        } else if (players_online.length == 2) {
            players_text = `Сейчас играют ${players_online[0]} и ${players_online[1]}`;
        } else if (players_online.length > 2) {
            players_text = `Сейчас играют ${players_online[0]} и ${players_online.length - 1} других игрока`;
        }

        document.querySelector('.server-players').innerText = players_text;

        setTimeout(() => {
            checkStatus();
        }, 10000);
    } else {
        status_obj.innerHTML = 'Сервер оффлайн';
        console.error('Request failed with status ', xhr.status);
    }
    };

    let url = 'https://demovio.lol/status.php';
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'text/plain');

    xhr.send();
}
checkStatus();

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
        console.log(xhr.responseText);
        let data = JSON.parse(xhr.responseText);
        list.innerHTML = '';

        for(let i=0; i<data.length; i++) {
            let skin = data[i].skin;
            if (skin == null) {
                skin = data[i].name;
            }
            let online_status = '';
            if (players_online.includes(data[i].name)) {
                online_status = `<div class="online_dot"></div>`;
            }

            let card = document.createElement('li');
            let contact = "";
            if (data[i].contact != undefined) {
                contact = `
                    <a href="https://t.me/${data[i].contact}"> <img src="img/message.svg"> </a>
                `;
            }

            let pronouns = "";
            if (data[i].pronouns != undefined) {
                pronouns = `<span class="pronouns">${data[i].pronouns}</span>`;
            }
            card.innerHTML = `
                <img src="https://api.mcheads.org/head/${skin}/42.png">
                <div>
                    <span class="name">${data[i].name}${online_status}</span>
                    ${pronouns}
                </div>
                ${contact}
            `;
            card.querySelector('img').addEventListener('error', (e) => {
                e.target.src = 'img/head_default.png';
            });
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

    let url = 'https://demovio.lol/players.php';
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
        const response = await fetch('php/userdata.php', {
          method: 'GET'
        })
        
        const result = await response.json();
        console.log(result);
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

        document.querySelector('.welcome_player').classList.add('shown');
        document.querySelector('.header-user_button').disabled = null;
        document.querySelector('.welcome_player span').innerText = `Добро пожаловать, ${user.name}!`;


        userSkin = user.name;
        if (user.skin.length > 0) {
            userSkin = user.skin;
        }

        document.querySelector('.welcome_player img').src = `https://api.mcheads.org/head/${userSkin}/42.png`;
        document.querySelector('.user_block-img').src = `https://api.mcheads.org/head/${userSkin}/36.png`;
        document.querySelector('.user_block-name').innerText = user.name;
        
        /* PASSPORT 42 chars */
        let citizenship = JSON.parse(user.citizenship);
        let cit_name = 'Калифорния / California';
        let alt_name = 'CALIFORN';

        let logoObj = document.querySelector('.citizenship-logo');
        switch (citizenship.code) {
            case "SH":
                cit_name = '上海 / Shanghai / Шанхай';
                alt_name = 'SHANGHAI';
                logoObj.onclick = function() {
                    window.open('https://youtu.be/tt9V570H6zc?si=XZzqAOzEToR8aOtH');
                };
                break;
            case "NY":
                cit_name = 'Нью Йорк / New York';
                alt_name = '>NEWYORK';
                logoObj.onclick = function() {
                    window.open('https://youtu.be/ddJqNY__9U8?si=15bOgth5isRzVJkf');
                }
                break;
            case "OH":
                cit_name = 'Огайо / Ohio';
                alt_name = '>OHIO>>>';
                logoObj.onclick = function() {
                    window.open('https://youtu.be/WSGjrluqwjc?si=7cqKUJkK_wE0p2_3');
                }
                break;
            case "GE":
                cit_name = 'Джорджия / Georgia';
                alt_name = 'GEORGIA>';
                break;
        }
        
        document.querySelector('.user-citizenship').innerText = cit_name;
        document.querySelector('.user-acceptance').innerText = citizenship.date;
        document.querySelector('.user-address').innerText = citizenship.address;
        document.querySelector('.user-protocol').innerText = citizenship.protocol;

        document.querySelector(`.citizenship-logo .${citizenship.code}`).style.display = 'block';
        document.querySelector(`.passport-country_color`).classList.add(citizenship.code);

        document.querySelector('.user-name').innerText = user.name;
        document.querySelector(`.passport-stamp.${citizenship.code}`).classList.add('shown');


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

        document.querySelector('.passport-user_pic.holo').src = `https://api.mcheads.org/head/${userSkin}/32.png`;
        document.querySelector('.passport-user_pic').src = `https://api.mcheads.org/head/${userSkin}/96.png`;

        const uuid = ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

        try {
            const mojResponse = await fetch('https://api.mojang.com/users/profiles/minecraft/'+user.name, {
                method: 'GET'
            })
            
            const mojResult = await response.text();
    
            uuid = mojResult.id;
        } catch (e) {
            console.log(`Failed to load UUID from Mojang API`);
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
        document.querySelector(`.citizenship-logo .GE`).style.display = 'block';
        document.querySelector(`.passport-country_color`).classList.add('GE');
        document.querySelector('.user-passport').style.display = 'none';
        document.querySelector('.no_passports').style.display = 'block';
        document.querySelector('.login_button').classList.add('shown');
    }
}
retrieveUserData();