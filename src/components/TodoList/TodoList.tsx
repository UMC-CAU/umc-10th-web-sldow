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
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} isDone={isDone} />
        ))}
      </ul>
    </div>
  );
};
