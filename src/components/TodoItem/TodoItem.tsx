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
    <li className="flex justify-between items-center p-2 border-b border-gray-200 bg-gray-50 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300">
      <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis block dark:text-gray-100 mr-2">{task.text}</span>
      <button
        className={`text-white px-2.5 py-1.5 rounded-md text-xs transition-colors duration-300 shrink-0 ${
          isDone 
            ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700' 
            : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
        }`}
        onClick={() => (isDone ? deleteTask(task) : completeTask(task))}
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
};
