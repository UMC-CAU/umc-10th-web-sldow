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
function doneTodo(id) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        const targetTodo = todos[index];
        todos.splice(index, 1);
        targetTodo.isCompleted = true;
        todos.push(targetTodo);
    }
    updateView();
}
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateView();
}
function updateView() {
    renderTodos(todos, doneTodo, deleteTodo);
}
document.addEventListener('DOMContentLoaded', () => {
    setupInput(addTodo);
    updateView();
});
