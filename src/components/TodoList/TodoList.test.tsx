import "@testing-library/jest-dom";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TodoList } from "./TodoList";
import { TodoContext } from "../../context/TodoContext";

describe("TodoList", () => {
  const mockTasks = [
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
  ];

  //TodoList 렌더링
  const renderTodoList = (title: string, isDone: boolean) => {
    return render(
      <TodoContext.Provider
        value={{
          todos: isDone ? [] : mockTasks,
          doneTasks: isDone ? mockTasks : [],
          addTodo: vi.fn(),
          completeTask: vi.fn(),
          deleteTask: vi.fn(),
        }}
      >
        <TodoList title={title} isDone={isDone} />
      </TodoContext.Provider>,
    );
  };

  describe("렌더링", () => {
    it("타이틀이 표시된다", () => {
      // Given: 제목이 해야할 일이면
      renderTodoList("해야할 일", false);

      // Then: 해야할 일로 적힌다.
      expect(screen.getByText("해야할 일")).toBeInTheDocument();
    });

    it("미완료 목록이 표시된다", () => {
      // Given: 미완료 목록에 대해
      renderTodoList("해야할 일", false);

      // Then: todos 목록(Task 1, Task 2)이 화면에 표시된다
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    it("완료 목록이 표시된다", () => {
      // Given : 완료 목록에 대해
      renderTodoList("해냈어!", true);

      // Then: todos 목록(Task 1, Task 2)이 화면에 표시된다
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    it("목록이 비어있으면 아이템이 렌더링되지 않는다", () => {
      // Given : todos, doneTasks가 모두 비어있으면
      render(
        <TodoContext.Provider
          value={{
            todos: [],
            doneTasks: [],
            addTodo: vi.fn(),
            completeTask: vi.fn(),
            deleteTask: vi.fn(),
          }}
        >
          <TodoList title="Empty List" isDone={false} />
        </TodoContext.Provider>,
      );

      // Then: 제목만 표시되고 아이템은 렌더링되지 않는다
      expect(screen.getByText("Empty List")).toBeInTheDocument();
      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });
  });
});
