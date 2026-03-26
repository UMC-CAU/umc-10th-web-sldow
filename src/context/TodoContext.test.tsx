import { renderHook, act } from "@testing-library/react";
import { TodoProvider, TodoContext } from "./TodoContext";
import { ReactNode, useContext } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <TodoProvider>{children}</TodoProvider>
);

describe("TodoContext", () => {
  it("할 일 추가", () => {
    // Given: 초기 상태의 TodoContext가 제공된 상태에서
    const { result } = renderHook(() => useContext(TodoContext)!, { wrapper });

    // When: 새로운 할 일을 추가하면
    act(() => {
      result.current.addTodo("Test Todo");
    });

    // Then: todos에 할 일이 추가되고, 내용이 일치해야 한다
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe("Test Todo");
  });

  it("할 일 완료", () => {
    // Given: 할 일이 하나 추가된 상태에서
    const { result } = renderHook(() => useContext(TodoContext)!, { wrapper });

    act(() => {
      result.current.addTodo("Test Todo");
    });
    const task = result.current.todos[0];

    // When: 해당 할 일을 완료 처리하면
    act(() => {
      result.current.completeTask(task);
    });

    // Then: todos에서는 제거되고 doneTasks로 이동해야 한다
    expect(result.current.todos).toHaveLength(0);
    expect(result.current.doneTasks).toHaveLength(1);
    expect(result.current.doneTasks[0].text).toBe("Test Todo");
  });

  it("할 일 삭제", () => {
    // Given: 완료된 할 일이 존재하는 상태에서
    const { result } = renderHook(() => useContext(TodoContext)!, { wrapper });

    act(() => {
      result.current.addTodo("Test Todo");
    });

    act(() => {
      result.current.completeTask(result.current.todos[0]);
    });
    const task = result.current.doneTasks[0];

    // When: 완료된 할 일을 삭제하면
    act(() => {
      result.current.deleteTask(task);
    });

    // Then: doneTasks에서 해당 할 일이 제거되어야 한다
    expect(result.current.doneTasks).toHaveLength(0);
  });
});
