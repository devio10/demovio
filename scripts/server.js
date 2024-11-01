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