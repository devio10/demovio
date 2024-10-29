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