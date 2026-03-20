const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

let nextId = Date.now();

export class TodoList {
  constructor() {
    this.list = [];
  }

  addListItem(value) {
    const newItem = { id: nextId++, value, status: "todo" };
    this.list.push(newItem);
  }

  doneListItem(id) {
    const item = this.list.find((item) => item.id === id);
    item.status = "done";
  }

  deleteListItem(id) {
    const index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
  }

  renderList() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    // todo 상태 아이템
    this.list
      .filter((item) => item.status === "todo")
      .forEach((item) => {
        const li = this.createTodoElement(item, "todo");
        todoList.appendChild(li);
      });

    // done 상태 아이템
    this.list
      .filter((item) => item.status === "done")
      .forEach((item) => {
        const li = this.createTodoElement(item, "done");
        doneList.appendChild(li);
      });
  }

  createTodoElement(todo, status) {
    // <li> 생성
    const li = document.createElement("li");
    li.classList.add("todo-list__li");

    // <p> 생성
    const p = document.createElement("p");
    p.textContent = todo.value;

    // <button> 생성 & 이벤트 추가
    const button = document.createElement("button");
    button.classList.add("todo-list__btn");
    if (status === "todo") {
      button.textContent = "완료";
      button.style.backgroundColor = "green";
      button.addEventListener("click", () => {
        this.doneListItem(todo.id);
        this.renderList();
      });
    } else {
      button.textContent = "삭제";
      button.style.backgroundColor = "red";
      button.addEventListener("click", () => {
        this.deleteListItem(todo.id);
        this.renderList();
      });
    }

    li.appendChild(p);
    li.appendChild(button);
    return li;
  }
}
