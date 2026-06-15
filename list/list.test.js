import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";

import { TodoList } from "./list";

describe("TodoList", () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList();
  });

  describe("addListItem", () => {
    it("addListItem가 호출되면 todo 상태의 item이 todoList에 추가된다.", () => {
      // Given: 아이템 준비
      const itemValue = "UMC 스터디";

      // When: addListItem 함수 호출
      todoList.addListItem(itemValue);

      // Then: todoList의 마지막 요소가 객체로 잘 저장되었는지 확인
      expect(todoList.list[todoList.list.length - 1]).toMatchObject({
        value: itemValue,
        status: "todo",
      });
    });

    it("addListItem 호출 시 id는 유일해야 한다.", () => {
      // Given: 아이템 준비
      const itemValue = "UMC 스터디";

      // When: addListItem 함수 호출 * 100
      for (let i = 0; i < 100; i++) {
        todoList.addListItem(itemValue);
      }

      // Then: todoList의 id들이 유효한 지 확인
      const ids = todoList.list.map((item) => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(todoList.list.length);
    });
  });

  describe("doneListItem", () => {
    it("doneListItem가 호출되면 해당 id의 item 상태가 done이 된다.", () => {
      // Given: 아이템과 배열 준비
      const id = 0;
      const itemValue = "UMC 스터디";
      const item = { id: id, value: itemValue, status: "todo" };
      const otherItem = { id: 1, value: itemValue, status: "todo" };
      todoList.list.push(item);
      todoList.list.push(otherItem);

      // When: doneListItem 함수 호출
      todoList.doneListItem(id);

      // Then: doneListItem의 상태가 변하는 지 확인
      expect(todoList.list).toContainEqual({
        id: id,
        value: itemValue,
        status: "done",
      });
    });
  });

  describe("deleteListItem", () => {
    it("deleteListItem가 호출되면 해당 id의 item이 삭제된다.", () => {
      // Given: 아이템과 배열 준비
      const id = 0;
      const item = { id: id, value: "UMC 스터디", status: "todo" };
      const otherItem = { id: 1, value: "UMC 스터디", status: "todo" };
      todoList.list.push(item);
      todoList.list.push(otherItem);

      // When: deleteListItem 함수 호출
      todoList.deleteListItem(id);

      // Then: 해당 item을 제거해 otherItem만 존재한다.
      expect(todoList.list).toContainEqual(otherItem);
    });
  });
});
