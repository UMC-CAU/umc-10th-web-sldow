import { setupInput } from './input/input.js';
import { renderTodos, Todo } from './list/list.js';

let todos: Todo[] = [];
let nextId = 1;

function addTodo(text: string) {
    const newTodo: Todo = {
        id: nextId++,
        text,
        isCompleted: false,
    };
    todos.push(newTodo);
    updateView();
}


// PR처럼, isCompleted 만 변경할 경우 렌더링 순서에 문제가 발생합니다.
// 그래서 done을 하면 아예 요소를 이동시키도록 만들었습니다. 
function doneTodo(id: number) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        // pop
        const targetTodo = todos[index]!;
        todos.splice(index, 1);

        targetTodo.isCompleted = true

        // push
        todos.push(targetTodo);
    }
    updateView();
}

function deleteTodo(id: number) {
    todos = todos.filter(todo => todo.id !== id);
    updateView();
}

function updateView() {
    renderTodos(todos, doneTodo, deleteTodo);
}

//Input 이벤트 연결 + 할 일 목록 렌더링
//자세한 건 list.ts와 input.ts에
document.addEventListener('DOMContentLoaded', () => {
    setupInput(addTodo);
    updateView();
});
