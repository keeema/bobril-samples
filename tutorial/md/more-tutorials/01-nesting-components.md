## Nesting Components

### Simple nesting

Some components are created just because to wrap some other components (to add styling, additional functionality etc.). To deal with nesting in components tree there is a special `input data` property `children`. It can be defined manually as in example or inherited from interface `b.IDataWithChildren`.

<!-- # from-file: ../../examples/hello-with-children/index.tsx -->

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

[Preview example](../../examples/hello-with-children/dist/index.html)

### Better Todo with slots for layout

Next example improves previous Todo example and shows more complex implementation with special component for Layout.

Following list allows to check state of task in todo list. `Checked` event is delegated up with callback `onItemChecked` in `input data`.

<!-- # from-file: ../../examples/todo-advanced/components/list.tsx -->

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

<!-- # from-file: ../../examples/todo-advanced/components/listItem.tsx -->

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

<!-- # from-file: ../../examples/todo-advanced/components/form.tsx -->

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

 <!-- # from-file: ../../examples/todo-advanced/components/layout.tsx -->

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

 <!-- # from-file: ../../examples/todo-advanced/index.tsx -->

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

[Preview example](../../examples/todo-advanced/dist/index.html)