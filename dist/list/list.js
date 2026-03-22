export function renderTodos(todos, onDone, onDelete) {
    const todoLists = document.querySelectorAll('.todos__list');
    const todoListElement = todoLists[0];
    const doneListElement = todoLists[1];
    if (!todoListElement || !doneListElement)
        return;
    todoListElement.innerHTML = '';
    doneListElement.innerHTML = '';
    todos.forEach(todo => {
        const li = createTodoElement(todo, onDone, onDelete);
        if (todo.isCompleted) {
            doneListElement.appendChild(li);
        }
        else {
            todoListElement.appendChild(li);
        }
    });
}
function createTodoElement(todo, onDone, onDelete) {
    const li = document.createElement('li');
    li.className = 'todos__item';
    const span = document.createElement('span');
    span.textContent = todo.text;
    const button = document.createElement("button");
    button.className = "todos__btn";
    if (!todo.isCompleted) {
        button.textContent = "완료";
        button.style.backgroundColor = "green";
        button.style.color = "white";
        button.addEventListener("click", () => {
            onDone(todo.id);
        });
    }
    else {
        button.textContent = "삭제";
        button.style.backgroundColor = "red";
        button.style.color = "white";
        button.addEventListener("click", () => {
            onDelete(todo.id);
        });
    }
    li.appendChild(span);
    li.appendChild(button);
    return li;
}
