export function setupInput(onAdd) {
    const inputField = document.querySelector('.input__field');
    const addButton = document.querySelector('.input__button');
    if (!inputField || !addButton)
        return;
    addButton.addEventListener('click', () => {
        const text = inputField.value.trim();
        if (text) {
            onAdd(text);
            inputField.value = '';
        }
    });
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = inputField.value.trim();
            if (text) {
                onAdd(text);
                inputField.value = '';
            }
        }
    });
}
