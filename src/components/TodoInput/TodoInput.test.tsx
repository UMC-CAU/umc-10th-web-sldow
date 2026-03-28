import "@testing-library/jest-dom";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoInput } from "./TodoInput";
import { TodoContext } from "../../context/TodoContext";

describe("TodoInput", () => {
  //addTodo 목 함수
  const mockAddTodo = vi.fn();

  // odoInput 컴포넌트 렌더링
  const renderTodoInput = () => {
    return render(
      <TodoContext.Provider
        value={{
          todos: [],
          doneTasks: [],
          addTodo: mockAddTodo,
          completeTask: vi.fn(),
          deleteTask: vi.fn(),
        }}
      >
        <TodoInput />
      </TodoContext.Provider>,
    );
  };

  // 테스트 전에 mock 초기화
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("입력창과 추가 버튼이 렌더링된다.", () => {
      // Given: TodoInput 렌더링
      renderTodoInput();

      // Then: 입력 필드가 존재하는지 확인
      expect(screen.getByPlaceholderText("할 일 입력")).toBeInTheDocument();
      // Then: 추가 버튼이 존재하는지 확인
      expect(
        screen.getByRole("button", { name: "할 일 추가" }),
      ).toBeInTheDocument();
    });

    it("초기 입력값은 빈 문자열이다.", () => {
      // Given: TodoInput 렌더링
      renderTodoInput();

      // Then: 입력 필드의 초기값이 빈 문자열인지 확인
      const input = screen.getByPlaceholderText(
        "할 일 입력",
      ) as HTMLInputElement;
      expect(input.value).toBe("");
    });
  });

  describe("입력값 업데이트", () => {
    it("텍스트를 입력하면 입력값이 업데이트된다", async () => {
      // Given: TodoInput 렌더링 + input 찾기
      renderTodoInput();
      const input = screen.getByPlaceholderText("할 일 입력");

      // When: 사용자가 할 일을 입력하면
      await userEvent.type(input, "할 일");

      // Then: 입력값이 "할 일"과 같은지 확인
      expect(input).toHaveValue("할 일");
    });

    it("특수문자를 포함한 입력도 정상적으로 반영된다", async () => {
      // Given: TodoInput 렌더링 + input 찾기
      renderTodoInput();
      const input = screen.getByPlaceholderText("할 일 입력");

      // When: 특수문자를 포함한 텍스트 입력
      await userEvent.type(input, "작업 @2024년 #완료");

      // Then: 입력값이 정확하게 저장되는지 확인
      expect(input).toHaveValue("작업 @2024년 #완료");
    });
  });

  describe("할 일 추가", () => {
    it("유효한 입력 후 버튼 클릭 시 할 일이 추가되고 입력창이 초기화된다", async () => {
      // Given: TodoInput 렌더링 + input과 버튼 찾기
      renderTodoInput();
      const input = screen.getByPlaceholderText("할 일 입력");
      const button = screen.getByRole("button", { name: "할 일 추가" });

      // When: 사용자가 "할 일" 입력 후 버튼 클릭
      await userEvent.type(input, "할 일");
      await userEvent.click(button);

      // Then: addTodo가 "할 일"과 함께 호출되었는지 확인
      expect(mockAddTodo).toHaveBeenCalledWith("할 일");
      // Then: addTodo가 정확히 1번 호출되었는지 확인
      expect(mockAddTodo).toHaveBeenCalledTimes(1);
      // Then: 입력창이 초기화되었는지 확인
      expect(input).toHaveValue("");
    });

    it("엔터 키 입력 시 할 일이 추가되고 입력창이 초기화된다", async () => {
      // Given: TodoInput 렌더링
      renderTodoInput();
      const input = screen.getByPlaceholderText("할 일 입력");

      // When: 사용자가 "할 일" 입력 후 엔터키 입력
      await userEvent.type(input, "할 일{Enter}");

      // Then: addTodo가 "할 일"과 함께 호출되었는지 확인
      expect(mockAddTodo).toHaveBeenCalledWith("할 일");
      // Then: 입력창이 초기화되었는지 확인
      expect(input).toHaveValue("");
    });
  });

  describe("입력값 검증", () => {
    it("빈 입력값으로는 할 일이 추가되지 않는다", async () => {
      // Given: TodoInput 렌더링
      renderTodoInput();
      const button = screen.getByRole("button", { name: "할 일 추가" });

      // When: 입력값 없이 버튼 클릭
      await userEvent.click(button);

      // Then: addTodo가 호출되지 않았는지 확인
      expect(mockAddTodo).not.toHaveBeenCalled();
    });

    it("공백만 입력하면 할 일이 추가되지 않는다", async () => {
      // Given: TodoInput 렌더링
      renderTodoInput();
      const input = screen.getByPlaceholderText("할 일 입력");
      const button = screen.getByRole("button", { name: "할 일 추가" });

      // When: 공백 3개 입력 후 버튼 클릭
      await userEvent.type(input, "   ");
      await userEvent.click(button);

      // Then: addTodo가 호출되지 않았는지 확인
      expect(mockAddTodo).not.toHaveBeenCalled();
    });

    it("탭과 줄바꿈만 포함된 입력은 무시된다", async () => {
      // Given: TodoInput 렌더링
      renderTodoInput();
      const input = screen.getByPlaceholderText("할 일 입력");
      const button = screen.getByRole("button", { name: "할 일 추가" });

      // When: 탭, 공백, 줄바꿈 입력 후 버튼 클릭
      await userEvent.type(input, "\t \n");
      await userEvent.click(button);

      // Then: addTodo가 호출되지 않았는지 확인
      expect(mockAddTodo).not.toHaveBeenCalled();
    });

    it("공백이 포함된 입력은 trim되어 추가된다", async () => {
      // Given: TodoInput 렌더링
      renderTodoInput();
      const input = screen.getByPlaceholderText("할 일 입력");
      const button = screen.getByRole("button", { name: "할 일 추가" });

      // When: 공백이 포함된 텍스트 입력 후 버튼 클릭
      await userEvent.type(input, "  할 일\t  ");
      await userEvent.click(button);

      // Then: trim된 값 "할 일"이 addTodo에 전달되었는지 확인
      expect(mockAddTodo).toHaveBeenCalledWith("할 일");
    });
  });
});
