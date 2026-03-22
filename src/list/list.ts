//렌더할 todo 객체 정의
export interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
}

//onDone, onDelete들은 createTodoElement에게 인자를 넘기기 위해
export function renderTodos(
    todos: Todo[],
    onDone: (id: number) => void,
    onDelete: (id: number) => void
): void {
    const todoLists = document.querySelectorAll('.todos__list');
    const todoListElement = todoLists[0] as HTMLUListElement | undefined; // 첫번째는 할 일 목록
    const doneListElement = todoLists[1] as HTMLUListElement | undefined; // 두번째는 완료 목록

    if (!todoListElement || !doneListElement) return;

    //기존 목록 지우고 다시 그릴거
    todoListElement.innerHTML = '';
    doneListElement.innerHTML = '';

    todos.forEach(todo => {
        const li = createTodoElement(todo, onDone, onDelete);

        if (todo.isCompleted) {
            doneListElement.appendChild(li);
        } else {
            todoListElement.appendChild(li);
        }
    });
}

function createTodoElement(
    todo: Todo,
    onDone: (id: number) => void,
    onDelete: (id: number) => void
): HTMLLIElement {
    //<li>
    const li = document.createElement('li');
    li.className = 'todos__item';

    //<span>
    const span = document.createElement('span');
    span.textContent = todo.text;

    //<button> + 이벤트 추가
    const button = document.createElement("button");
    button.className = "todos__btn";

    if (!todo.isCompleted) {
        button.textContent = "완료";
        button.style.backgroundColor = "green";
        button.style.color = "white";
        button.addEventListener("click", () => {
            onDone(todo.id);
        });
    } else {
        button.textContent = "삭제";
        button.style.backgroundColor = "red";
        button.style.color = "white";
        button.addEventListener("click", () => {
            onDelete(todo.id);
        });
    }

    //합치기
    li.appendChild(span);
    li.appendChild(button);
    return li;
}
