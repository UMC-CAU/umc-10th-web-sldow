import "@testing-library/jest-dom";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "./TodoItem";
import { TodoContext } from "../../context/TodoContext";
import type { Task } from "../../type/types";

describe("TodoItem", () => {
  const mockCompleteTask = vi.fn();
  const mockDeleteTask = vi.fn();

  //TodoItem 렌더링
  const renderTodoItem = (task: Task, isDone: boolean) => {
    return render(
      <TodoContext.Provider
        value={{
          todos: isDone ? [] : [task],
          doneTasks: isDone ? [task] : [],
          addTodo: vi.fn(),
          completeTask: mockCompleteTask,
          deleteTask: mockDeleteTask,
        }}
      >
        <TodoItem task={task} isDone={isDone} />
      </TodoContext.Provider>,
    );
  };

  //목함수 초기화
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("렌더링", () => {
    it("미완료 상태에서 완료 버튼이 보인다", () => {
      // Given: 아이템 생성했을 때
      renderTodoItem({ id: 1, text: "Test Task" }, false);

      // Then: 해당 아이템과 완료 버튼이 보인다.
      expect(screen.getByText("Test Task")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "완료" })).toBeInTheDocument();
    });

    it("완료 상태에서 삭제 버튼이 보인다", () => {
      // Given: 아이템 생성했을 때
      renderTodoItem({ id: 2, text: "Done Task" }, true);

      // Then: 해당 아이템과 삭제 버튼이 보인다.
      expect(screen.getByText("Done Task")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
    });
  });

  describe("버튼 동작", () => {
    it("완료 버튼 클릭 시 completeTask가 호출된다", async () => {
      // Given: 아이템을 생성했을 때
      const task = { id: 1, text: "Test Task" };
      renderTodoItem(task, false);

      // When: 사용자가 완료 버튼을 클릭하면
      await userEvent.click(screen.getByRole("button", { name: "완료" }));

      // Then: task를 인자로 받아서 호출
      // completeTask가 호출되었고, deleteTask는 호출되지 않는다.
      expect(mockCompleteTask).toHaveBeenCalledWith(task);
      expect(mockDeleteTask).not.toHaveBeenCalled();
    });

    it("삭제 버튼 클릭 시 deleteTask가 호출된다", async () => {
      // Given: 아이템을 생성했을 때
      const task = { id: 2, text: "Done Task" };
      renderTodoItem(task, true);

      // When: 사용자가 삭제 버튼을 클릭하면
      await userEvent.click(screen.getByRole("button", { name: "삭제" }));

      // Then: task를 인자로 받아서 호출
      // deleteTask가 호출되었고, completeTask는 호출되지 않는다.
      expect(mockDeleteTask).toHaveBeenCalledWith(task);
      expect(mockCompleteTask).not.toHaveBeenCalled();
    });
  });
});
