import { useContext } from "react";
import type { Task } from "../../type/types";
import { TodoContext } from "../../context/TodoContext";

type TodoItemProps = {
  task: Task;
  isDone: boolean;
};

export const TodoItem = ({ task, isDone }: TodoItemProps) => {
  const { completeTask, deleteTask } = useContext(TodoContext)!;

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button
        className="render-container__item-button"
        style={{ backgroundColor: isDone ? "#dc3545" : "#28a745" }}
        onClick={() => (isDone ? deleteTask(task) : completeTask(task))}
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
};
