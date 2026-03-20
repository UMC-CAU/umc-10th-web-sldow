import { setupInput } from "./input";

describe("setupInput", () => {
  it("enter를 치면 input은 빈 문자열이 된다.", () => {
    // given: input 요소를 생성하고 DOM에 추가, 콜백 함수 설정
    const input = document.createElement("input");
    document.body.appendChild(input);

    const addFn = jest.fn();
    setupInput(input, addFn);

    // when: input에 값을 입력하고 Enter 키를 누른다
    input.value = "새로운 할 일 생성하기";
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    // when: input에 값을 입력하고 Enter 키를 누른다
    expect(input.value).toBe("");
  });

  it("문자열이 비어있는 경우, enter을 쳐도 등록되지 않는다.", () => {
    // given: input 요소를 생성하고 DOM에 추가, 콜백 함수 설정
    const input = document.createElement("input");
    document.body.appendChild(input);

    const addFn = jest.fn();
    setupInput(input, addFn);

    // when: input에 값을 입력하고 Enter 키를 누른다
    input.value = "";
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    // then: 콜백 함수가 호출되지 않는다
    expect(addFn).not.toHaveBeenCalled();
  });
});
