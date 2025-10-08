const items = document.querySelectorAll("button.card");
const screens = ["titlescreen", "players", "passport", "download"];

document.querySelector(".show_stack").addEventListener("mouseenter", function () {
	document.querySelector(".stack_hint").classList.remove("hidden");
	document.querySelector(".menu_glowing").classList.remove("hidden");
});
document.querySelector(".show_stack").addEventListener("mouseleave", function () {
	document.querySelector(".stack_hint").classList.add("hidden");
	document.querySelector(".menu_glowing").classList.add("hidden");
});
let pageState = 0;

function handleOptions(element) {
	if (element.parentElement.querySelector(".option-button.selected")) {
		element.parentElement.querySelector(".option-button.selected").classList.remove("selected");
	}
	element.classList.add("selected");
}

function resetBackground() {
	let content = document.querySelector(".page-backgrounds").innerHTML;

	document.querySelector(".page-backgrounds").innerHTML = "";
	setTimeout(() => {
		document.querySelector(".page-backgrounds").innerHTML = content;
	}, 1);
}

function openCards() {
	toggleMobilePassport(false);
	screens.forEach((screenName) => {
		document.querySelector(`.screen-${screenName}`).classList.add("hidden");
		document.querySelector(`#bg-${screenName}`).classList.add("hiding");
	});

	document.querySelector(".show_stack").classList.add("hidden");
	document.querySelector(".stack_hint").classList.add("hidden");
	document.querySelector(".menu_glowing").classList.add("hidden");

	document.querySelector("body").classList.remove("black");
	document.querySelector(".page-backgrounds").classList.add("hidden");

	document.querySelector(".cards-stack").classList.remove("hidden");
	document.querySelector(".cards-container").classList.add("reappear");
	document.querySelector(".cards-container").classList.remove("grayed");

	items.forEach((item, index) => {
		item.disabled = "true";
		item.classList.remove("hiding");
		item.classList.remove("expand");
	});

	setTimeout(() => {
		items.forEach((item) => {
			item.disabled = null;
		});
		screens.forEach((screenName) => {
			document.querySelector(`#bg-${screenName}`).classList.remove("hiding");
			document.querySelector(`#bg-${screenName}`).classList.add("hidden");
		});
		resetBackground();
	}, 500);
}
document.querySelector(".show_stack").addEventListener("click", openCards);

function openScreen(value) {
	screens.forEach((screenName) => {
		document.querySelector(`.screen-${screenName}`).classList.add("hidden");
		document.querySelector(`#bg-${screenName}`).classList.add("hidden");
	});

	document.querySelector(`#bg-${value}`).classList.remove("hidden");
	document.querySelector(`#bg-${value}`).classList.remove("hiding");
	document.querySelector(`.screen-${value}`).classList.remove("hidden");
	document.querySelector(`.screen-${value}`).scrollTop = 0;
	if (document.querySelector(`.screen-${value} .window`)) {
		document.querySelector(`.screen-${value} .window`).scrollTop = 0;
	}

	items.forEach((item) => {
		if (!item.classList.contains(value)) {
			item.classList.add("hiding");
		}
		item.style.animationDelay = `0s`;
		item.disabled = "true";
	});
	document.querySelector(`.card.${value}`).classList.add("expand");
	document.querySelector("body").classList.add("black");

	document.querySelector(".cards-stack").classList.add("hidden");
	document.querySelector(".page-backgrounds").classList.remove("hidden");
	document.querySelector(".show_stack").classList.remove("hidden");
	pageState = 1;
}
function openHelpSection(element) {
	let parent = element.parentElement;
	let doClose = false;
	if (parent.classList.contains("opened")) {
		doClose = true;
	}
	if (document.querySelector(".help-section.opened")) {
		document.querySelector(".help-section.opened").classList.remove("opened");
	}
	if (!doClose) {
		parent.classList.add("opened");
	}
}

function getFullHeight(element) {
	const originalStyle = element.style.cssText;
	element.style.display = "flex";

	const height = element.offsetHeight;
	element.style.cssText = originalStyle;

	return height;
}

function setHelpSectionsHeight() {
	for (let section of document.querySelectorAll(".help-section-content")) {
		section.style.setProperty("--height", `${getFullHeight(section)}px`);
		section.classList.add("handled");
	}
}

const waitUntilImagesLoad = (element) => {
	return new Promise((resolve) => {
		const images = element.querySelectorAll("img");
		let loadedImagesCount = 0;

		if (images.length === 0) {
			resolve(element.scrollHeight);
			return;
		}

		images.forEach((img) => {
			if (img.complete) {
				loadedImagesCount++;
				if (loadedImagesCount === images.length) {
					resolve(element.scrollHeight);
				}
			} else {
				img.addEventListener("load", () => {
					loadedImagesCount++;

					if (loadedImagesCount === images.length) {
						resolve(element.scrollHeight);
					}
				});

				img.addEventListener("error", () => {
					loadedImagesCount++;
					if (loadedImagesCount === images.length) {
						resolve(element.scrollHeight);
					}
				});
			}
		});
	});
};
waitUntilImagesLoad(document.querySelector(".screen-download")).then(() => {
	setHelpSectionsHeight();
});
function toggleMobilePassport(state) {
	if (state == true) {
		document.querySelector(".user-passport").classList.add("mobile-opened");
		return;
	}
	document.querySelector(".user-passport").classList.remove("mobile-opened");
}

function showAnnouncement(announcement) {
	document.querySelector(".announcement").classList.add("shown");
	document.querySelector(".announcement h2").innerHTML = announcement.title;
	document.querySelector(".announcement-content").innerHTML = announcement.content;

	if (announcement.image) {
		document.querySelector(".announcement img").src = announcement.image;
		document.querySelector(".announcement img").style.display = "block";
	} else {
		document.querySelector(".announcement img").style.display = "none";
	}

	let buttons = announcement.buttons;
	document.querySelector(".announcement .modal-buttons").innerHTML = "";
	for (let i = 0; i < buttons.length; i++) {
		let button = document.createElement("button");
		button.className = "modal";
		if (buttons[i].isAccent) {
			button.className = "modal accent";
		}

		button.innerHTML = buttons[i].content;
		button.onclick = function () {
			buttons[i].clickFunction();
			hideAnnouncement();
		};
		document.querySelector(".announcement .modal-buttons").appendChild(button);
	}
}
function hideAnnouncement() {
	document.querySelector(".announcement").classList.remove("shown");
}
const backgrounds = [
	{
		name: "Коллекции",
		code: "COS",
		pictures: ["collections-1", "collections-2"],
	},
	{
		name: "Калифорния",
		code: "CA",
		pictures: ["california-1", "california-2", "california-3", "california-4"],
	},
	{
		name: "Шанхай",
		code: "SH",
		pictures: ["shanghainew-1", "shanghainew-2", "shanghainew-3", "shanghainew-4"],
	},
	{
		name: "Нью Йорк",
		code: "NY",
		pictures: ["newyork-1"],
	},
	{
		name: "Огайо",
		code: "OH",
		pictures: ["ohio-1"],
	},
	{
		name: "Джорджия",
		code: "GE",
		pictures: ["georgia-1", "georgia-2"],
	},
];

function loadBackgroundsList() {
	let list = document.querySelector(".backgrounds_list");
	list.innerHTML = "";
	let currentPoster = localStorage.getItem("background");

	for (let i = 0; i < backgrounds.length; i++) {
		let title = document.createElement("span");
		title.className = "bg_list-title";
		title.innerText = backgrounds[i].name;
		list.appendChild(title);

		let img_list = document.createElement("div");
		img_list.className = `bg_list ${backgrounds[i].code}`;
		list.appendChild(img_list);

		let category_pics = backgrounds[i].pictures;

		for (let k = 0; k < category_pics.length; k++) {
			let item = document.createElement("button");
			item.innerHTML = `<img src='${getBackgroundURL(category_pics[k], "-preview")}'>`;
			if (currentPoster === category_pics[k]) {
				item.className = "selected";
			}
			item.addEventListener("click", function () {
				if (document.querySelector(".backgrounds_list button.selected")) {
					document.querySelector(".backgrounds_list button.selected").classList.remove("selected");
				}
				this.classList.add("selected");
				changeBackground(category_pics[k]);
			});

			img_list.appendChild(item);
		}
	}

	switch (localStorage.getItem("poster-quality")) {
		case "hires":
			document.querySelectorAll(".quality-options button")[1].classList.add("selected");
			break;
		default:
			document.querySelectorAll(".quality-options button")[0].classList.add("selected");
	}

	switch (localStorage.getItem("theme")) {
		case "light":
			document.querySelectorAll(".theme-options button")[1].classList.add("selected");
			break;
		case "dark":
			document.querySelectorAll(".theme-options button")[2].classList.add("selected");
			break;
		default:
			document.querySelectorAll(".theme-options button")[0].classList.add("selected");
	}
}

function changeBackground(name) {
	localStorage.setItem("background", name);
	document.querySelector("#bg-titlescreen").src = getBackgroundURL(name);
}

function getBackgroundURL(name, quality, theme) {
	let preferredQuality = "";

	if (localStorage.getItem("poster-quality") === "hires") {
		preferredQuality = "-hires";
	}
	if (!quality) {
		quality = preferredQuality;
	}
	if (!theme) {
		theme = getTheme();
	}

	return `posters/home-${name}-${theme}${quality}.webp`;
}

function getTheme() {
	let theme = localStorage.getItem("theme");
	if (theme === "auto" || theme === null) {
		const userPrefersDark =
			window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		return userPrefersDark ? "dark" : "light";
	}
	return theme;
}

function updateOtherBackgrounds() {
	let quality = "";
	if (localStorage.getItem("poster-quality") === "hires") {
		quality = "-hires";
	}
	let theme = `-${getTheme()}`;

	document.querySelector("#bg-players").src = `posters/players${quality}.webp`;
	document.querySelector("#bg-passport").src = `posters/passport${theme}${quality}.webp`;
}

function loadBackgroundFromMemory() {
	loadBackgroundsList();
	let current = localStorage.getItem("background");
	let value = current === null || current === "null" ? "california-4" : current;

	changeBackground(value);
	updateOtherBackgrounds();
}
loadBackgroundFromMemory();

const announcementActivated = {
	title: "Ваш аккаунт активирован",
	image: "images/de_bg.png",
	content: `
        <p>Поздравляем! Теперь вы можете присоединиться к игре на сервере Demovio! Также вам доступен паспорт Соединённых Штатов Демовио. Чтобы начать играть, воспользуйтесь инструкцией ниже:</p>
        <a class="window-wide_link" href="https://demovio.love/help">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"></path></svg>
            Открыть инструкцию по установке
        </a>
    `,
	buttons: [
		{
			content: "Продолжить",
			clickFunction: function () {
				localStorage.removeItem("notActivated");
			},
		},
	],
};
const annoucementNotActivated = {
	title: "Ваш аккаунт в процессе активации",
	image: "images/de_bg.png",
	content: `
        <p>Мы ждём, когда вы сможете присоединиться к игре. А пока что один из администраторов проверяет ваши данные, чтобы принять вашу заявку на вступление.</p>
        <a href="https://t.me/devio101" class="window-wide_link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"></path></svg>
            Связаться с администратором
        </a>
    `,
	buttons: [
		{
			content: "Продолжить",
			isAccent: true,
			clickFunction: function () {},
		},
	],
};
const announcementBan = {
	title: "Подтвердите удаление аккаунта",
	image: "images/de_bg.png",
	content: `
        <p>Это необратимое действие. Игрок также будет удалён из белого списка и, если вы передумаете, ему придётся заново проходить процедуру регистрации.</p>
    `,
	buttons: [
		{
			content: "Отмена",
			clickFunction: function () {},
		},
		{
			content: "Удалить",
			isAccent: true,
			clickFunction: function () {
				backstageAction("deleteaccount");
			},
		},
	],
};

function toggleRedirect() {
	if (localStorage.getItem("redirect") === "true") {
		localStorage.setItem("redirect", "false");
	} else {
		localStorage.setItem("redirect", "true");
	}
}
