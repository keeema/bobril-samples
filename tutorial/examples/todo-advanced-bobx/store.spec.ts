import { TodoStore } from "./store";

describe("Todo store", () => {
  let store: TodoStore;

  beforeEach(() => (store = new TodoStore()));

  describe("edit", () => {
    it("should change state of item with new value just on specific index", () => {
      store.add("first");
      store.add("second");

      store.edit(1, true);

      expect(store.list[0].done).toBeFalsy();
      expect(store.list[1].done).toBeTruthy();
    });
  });
});
