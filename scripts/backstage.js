var contextName;
function playerOptions(event, name, isActivated) {
    if (isActivated === '1') {
        document.querySelector('#context_menu-activate').classList.remove('hidden');
        document.querySelector('#context_menu-skin').classList.add('hidden');
        document.querySelector('#context_menu-edit').classList.add('hidden');
        document.querySelector('#context_menu-passport').classList.add('hidden');
    } else {
        document.querySelector('#context_menu-activate').classList.add('hidden');
        document.querySelector('#context_menu-skin').classList.remove('hidden');
        document.querySelector('#context_menu-edit').classList.remove('hidden');
        document.querySelector('#context_menu-passport').classList.remove('hidden');
    }
    contextName = name;
    summonContextMenu(event);
}

async function backstageAction(action) {
    try {
        const response = await fetch(`${api_url}${action}.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: contextName })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error occurred');
        }

        const data = await response.json();
        console.log('Success:', data);
        playersList();
    } catch (error) {
        console.error('Error:', error.message);
        return { error: error.message };
    }
} 