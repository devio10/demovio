let currentSkinProvider = 'license';
function selectSkinProvider(provider) {
    if (document.querySelector('.skin-provider.shown')) {
        document.querySelector('.skin-provider.shown').classList.remove('shown');
    }
    document.querySelector(`.${provider}-provider`).classList.add('shown');

    currentSkinProvider = provider;

    if (currentSkinProvider === 'license') {
        document.querySelector('.background-skin-preview').classList.add('shown');
    } else {
        document.querySelector('.background-skin-preview').classList.remove('shown');
    }
}


var selectedSkin;
function saveSkin(doSkip) {
    if (doSkip) {
        document.querySelector('.input-skin').value = "";
        document.querySelector('.input-skin').disabled = "true";
        handleSkinPreview();
        selectedSkin = "";
        showScreen('citizenship');
        loadedImage = 0;
        return;
    }

    if (currentSkinProvider === 'customskin'){
        showScreen('citizenship');
        return;
    }

    let inputValue = currentPreview.trim();
    if (!checkedCurrentSkin) {
        return;
    }
    if (document.querySelector('.input-skin').value.trim().length === 0) {
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

document.querySelector('.skin-preview').addEventListener('load', (e) => {
    checkedCurrentSkin = true;
    if (currentPreview === 'Steve1' || currentPreview === playerName) {
        document.querySelector('.licenseskin-submit').disabled = true;
    } else {
        document.querySelector('.licenseskin-submit').disabled = undefined;
    }
});

let debounceTimeout;
document.querySelector('.input-skin').addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    document.querySelector('.licenseskin-submit').disabled = true;
    checkedCurrentSkin = false;
    debounceTimeout = setTimeout(() => {
        handleSkinPreview();
    }, 350);
});
document.querySelector('.skin-preview').addEventListener('error', (e) => {
    if (currentPreview != 'Steve1') {
        wrongSkins[wrongSkins.length] = currentPreview;
    }
    handleSkinPreview();
});


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

    if (currentPreview === 'Steve1' || currentPreview === playerName) {
        document.querySelector('.licenseskin-submit').disabled = true;
    }
}