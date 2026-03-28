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
    <form onSubmit={handleSubmit} className="flex gap-2.5 mb-5">
      <input
        type="text"
        className="flex-1 p-[8px] border border-[#ccc] rounded-[6px] text-[14px] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors duration-300"
        placeholder="할 일 입력"
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300">
        할 일 추가
      </button>
    </form>
  );
};
