import { useContext } from "react";
import { TodoItem } from "../TodoItem";
import { TodoContext } from "../../context/TodoContext";

type TodoListProps = {
  title: string;
  isDone: boolean;
};

export const TodoList = ({ title, isDone }: TodoListProps) => {
  const { todos, doneTasks } = useContext(TodoContext)!;
  const tasks = isDone ? doneTasks : todos;

  return (
    <div className="w-full text-left">
      <h2 className="text-lg mb-2.5 flex justify-center font-semibold dark:text-gray-100 transition-colors duration-300">{title}</h2>
      <ul className="list-none p-0 m-0 space-y-1.5">
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} isDone={isDone} />
        ))}
      </ul>
    </div>
  );
};
