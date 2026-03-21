import { setupInput } from './input/input.js';
import { renderTodos } from './list/list.js';
let todos = [];
let nextId = 1;
function addTodo(text) {
    const newTodo = {
        id: nextId++,
        text,
        isCompleted: false,
    };
    todos.push(newTodo);
    updateView();
}
function toggleTodo(id) {
    todos = todos.map(todo => todo.id === id ? Object.assign(Object.assign({}, todo), { isCompleted: !todo.isCompleted }) : todo);
    updateView();
}
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateView();
}
function updateView() {
    renderTodos(todos, toggleTodo, deleteTodo);
}
function init() {
    setupInput(addTodo);
    updateView();
}
document.addEventListener('DOMContentLoaded', init);
