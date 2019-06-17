# More tutorials

If you have finished [Get Started](./get-started.md) section then you can continue with exploring more possibilities offered by bobril.

## Nesting Components

### Simple nesting

Some components are created just because to wrap some other components (to add styling, additional functionality etc.). To deal with nesting in components tree there is a special `input data` property `children`. It can be defined manually as in example or inherited from interface `b.IDataWithChildren`.

<!-- # from-file: ./examples/hello-with-children/index.tsx -->

```tsx
import * as b from "bobril";

interface IHelloData {
  name: string;
  children: b.IBobrilChildren;
}

class Hello extends b.Component<IHelloData> {
  render(): b.IBobrilChildren {
    return (
      <>
        <h1>Hello {this.data.name}</h1>
        {this.data.children}
      </>
    );
  }
}

b.init(() => (
  <Hello name="Developer">
    <p>
      This is your first <strong>bobril</strong> application.
    </p>
  </Hello>
));

```

[Preview example](./hello-with-children/index.html)

### Better Todo with slots for layout

Next example improves previous Todo example and shows more complex implementation with special component for Layout.

Following list allows to check state of task in todo list. `Checked` event is delegated up with callback `onItemChecked` in `input data`.

<!-- # from-file: ./examples/todo-advanced/components/list.tsx -->

```tsx
import * as b from "bobril";
import { ListItem } from "./listItem";

export interface IItem {
  id: number;
  text: string;
  done: boolean;
}

export interface IListData {
  items: IItem[];
  onItemChecked(index: number, value: boolean): void;
}

export function List(data: IListData): b.IBobrilNode {
  return (
    <ul style={noBullets}>
      {data.items.map((item, index) => (
        <ListItem {...item} index={index} onItemChecked={data.onItemChecked} />
      ))}
    </ul>
  );
}

const noBullets = b.styleDef({ listStyleType: "none" });

```

`ListItem` component reflects the `done` state with conditional apply of `strikeOut` style.

<!-- # from-file: ./examples/todo-advanced/components/listItem.tsx -->

```tsx
import * as b from "bobril";
import { IItem } from "./list";

export interface IItemData extends IItem {
  index: number;
  onItemChecked(index: number, value: boolean): void;
}
export function ListItem(data: IItemData): b.IBobrilNode {
  return (
    <li key={data.id} style={data.done && strikeOut}>
      <input
        type="checkbox"
        value={data.done}
        onChange={value => data.onItemChecked(data.index, value)}
      />
      {data.text}
    </li>
  );
}

const strikeOut = b.styleDef({ textDecoration: "line-through" });

```

Form is the same as in previous example.

<!-- # from-file: ./examples/todo-advanced/components/form.tsx -->

```tsx
import * as b from "bobril";

export interface IFormData {
  onSubmit(value: string): void;
}

export class Form extends b.Component<IFormData> {
  private _value: string = "";

  render(): b.IBobrilChildren {
    return (
      <>
        <input
          type="text"
          value={this._value}
          onChange={newValue => this.updateValue(newValue)}
          onKeyUp={ev => ev.which === 13 && this.submit()}
          style={spaceOnRight}
        />
        <button onClick={() => this.submit()}>OK</button>
      </>
    );
  }

  private updateValue(newValue: string): void {
    this._value = newValue;
    b.invalidate(this);
  }

  private submit(): boolean {
    this.data.onSubmit(this._value);
    this._value = "";
    b.invalidate(this);
    return true;
  }
}

const spaceOnRight = b.styleDef({ marginRight: 5 });

```

Finally we come to layout component. It defines its `children` as object with properties of type `b.IBobrilChildren` for each specific part instead of one main `b.IBobrilChildren`. Properties are accessible in `input data` object in property `children`.

 <!-- # from-file: ./examples/todo-advanced/components/layout.tsx -->

```tsx
import * as b from "bobril";

export interface ILayoutData {
  children: {
    header: b.IBobrilChildren;
    body: b.IBobrilChildren;
    footer: b.IBobrilChildren;
  };
}

export function Layout(data: ILayoutData): b.IBobrilNode {
  return (
    <>
      <div>{data.children.header}</div>
      <div>{data.children.body}</div>
      <div>{data.children.footer}</div>
    </>
  );
}

```

Now the layout can be used in _index.tsx_. This pattern for layout is called `named slots projection`.

There is also new function `edit` for editing the current state of Todo Item.

 <!-- # from-file: ./examples/todo-advanced/index.tsx -->

```tsx
import * as b from "bobril";
import { Layout } from "./components/layout";
import { List, IItem } from "./components/list";
import { Form } from "./components/form";

class Todo extends b.Component {
  private _todos: IItem[] = [];

  render(): b.IBobrilChildren {
    return (
      <Layout>
        {{
          header: <h1>TODO</h1>,
          body: (
            <List
              items={this._todos}
              onItemChecked={(index, value) => this.edit(index, value)}
            />
          ),
          footer: <Form onSubmit={text => this.add(text)} />
        }}
      </Layout>
    );
  }

  private add(text: string): void {
    this._todos.push({ id: Date.now(), text, done: false });
    b.invalidate(this);
  }

  private edit(index: number, value: boolean): void {
    this._todos[index].done = value;
    b.invalidate(this);
  }
}

b.init(() => <Todo />);

```

[Preview example](./todo-advanced/index.html)

## Maintain the state with BobX

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

 <!-- # from-file: ./examples/todo-advanced-bobx/store.ts -->

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

 <!-- # from-file: ./examples/todo-advanced-bobx/index.tsx -->

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

[Preview example](./todo-advanced-bobx/index.html)

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

 <!-- # from-file: ./examples/todo-advanced-bobx/store.spec.ts -->

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
