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

function doneTodo(id: number) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
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
