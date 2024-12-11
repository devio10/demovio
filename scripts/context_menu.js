
function summonContextMenu(event) {
    let context_menu = document.querySelector(".context_menu");
    if (!context_menu.classList.contains('hidden')) {
        context_menu.classList.add("hidden");
        return;
    }
    contextmenuClick(event);
    setTimeout(() => {
        document.addEventListener('click', () => {
            context_menu.classList.add("hidden");
            contextMenuData = -1;
        }, { once: true });
    }, 1);
} 

function contextmenuClick(event, xx, yy) {
    event.preventDefault();
    let context_menu = document.querySelector(".context_menu");

    let rect = context_menu.getBoundingClientRect();

    let x = Math.min(event.clientX, window.innerWidth - rect.width - 16);
    let y = Math.min(event.clientY, window.innerHeight - rect.height - 16);

    if (rect.height > 500) {
        y = event.clientY;
    }

    if (xx != undefined) { x = xx; }
    if (yy != undefined) { y = yy; }

    context_menu.style.top = `${y}px`;
    context_menu.style.left = `${x}px`;

    context_menu.classList.remove("hidden");
}