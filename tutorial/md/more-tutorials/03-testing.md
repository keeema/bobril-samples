## Testing

`Bobril-build` provides automatic run of tests out-of-the box.

The only condition is to have test files named with postfix _\*spec.ts_

It has automatically referenced type definitions for `jasmine` framework and run all tests on every rebuild. Results can be found in terminal.

 <!-- # from-file: ../../examples/todo-advanced-bobx/store.spec.ts -->

```tsx
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

```
