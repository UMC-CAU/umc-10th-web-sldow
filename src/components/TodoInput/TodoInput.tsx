import { useState, useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

export const TodoInput = () => {
  const { addTodo } = useContext(TodoContext)!;
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    //새로고침 방지 역할
    e.preventDefault();

    if (!inputValue.trim()) return;
    addTodo(inputValue.trim());
    //초기화
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};
