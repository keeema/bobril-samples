## Maintain state with BobX

There is no special logic for maintaining the state in previous examples and reactions for any event is triggered manually with `b.invalidate`.

To remove those duplicate calls and make state really reactive and maintainable there exists `BobX` library. It uses `observable` pattern and works the same way as the original `mobx` but with few improvements.

### Installation

`BobX` is standard npm package so just type in your terminal:

```bash
npm i bobx --save
```

### BobX store

It is a good practice too keep domain data standalone from view. Following example shows how to change previous Todo application to use bobx.

Next code defines `TodoStore` with private list of `_todos`. This property is decorated with `@observable` decorator. Every bobril node created from component which reads `_todos` in its render _(observer)_ is automatically re-rendered on any change of `_todos` _(observable subject)_.

<!-- # from-file: ../../examples/todo-advanced-bobx/store.ts -->

```tsx
import { observable } from "bobx";
import { IItem } from "./components/list";

export class TodoStore {
  @observable
  private _todos: IItem[] = [];

  get list(): IItem[] {
    return this._todos;
  }

  add(text: string): void {
    this._todos.push({ id: Date.now(), text, done: false });
  }

  edit(index: number, value: boolean): void {
    this._todos[index].done = value;
  }
}

```

Such store is ready to be used in main component of Todo application.

 <!-- # from-file: ../../examples/todo-advanced-bobx/index.tsx -->

```tsx
import * as b from "bobril";
import { Layout } from "./components/layout";
import { List } from "./components/list";
import { Form } from "./components/form";
import { TodoStore } from "./store";

class Todo extends b.Component {
  todos = new TodoStore();

  render(): b.IBobrilChildren {
    return (
      <Layout>
        {{
          header: <h1>TODO</h1>,
          body: (
            <List
              items={this.todos.list}
              onItemChecked={(index, value) => this.todos.edit(index, value)}
            />
          ),
          footer: <Form onSubmit={text => this.todos.add(text)} />
        }}
      </Layout>
    );
  }
}

b.init(() => <Todo />);

```

[Preview example](../../examples/todo-advanced-bobx/dist/index.html)

### Basic optimizations

`BobX` provides several strategies to optimize watching of observable subjects to watch only what is really needed. Those are basic tools:

`@observable` - watches objects recursively - it stops recursion only on property with prototype (class objects)

`@observable.shallow` - watches objects reference and only first level of properties

`@observable.ref` - watches objects only reference level

`@computed` - special decorator creating memoization on getter using just `observable` values for its computation

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
