//입력창과 버튼에 이벤트를 연결하는 함수
//버튼에 추가할 이벤트를 받는다.
export function setupInput(onAdd: (text: string) => void): void {
    const inputField = document.querySelector<HTMLInputElement>('.input__field');
    const addButton = document.querySelector<HTMLButtonElement>('.input__button');

    if (!inputField || !addButton) return;

    //버튼
    //text가 있는 경우에만 onAdd + 입력창 초기화
    addButton.addEventListener('click', () => {
        const text = inputField.value.trim();
        if (text) {
            onAdd(text);
            inputField.value = '';
        }
    });

    //인풋
    //enter 키를 누르면 마찬가지로 onAdd + 입력창 초기화
    inputField.addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const text = inputField.value.trim();
            if (text) {
                onAdd(text);
                inputField.value = '';
            }
        }
    });
}
