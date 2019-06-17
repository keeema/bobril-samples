# Get started

Go through this short tutorial and learn how easy you can create your own production-ready application.

## Setup build environment

Bobril is distributed with its own build system based on `NodeJS` and `.NET Core` providing all necessary tasks like compilation, minification, translations, sprites, styles etc. You can install it globally by `npm`.

```bash
npm i bobril-build -g
```

## Prepare application package

You can initialize your application as an usual `npm` package by following.

```bash
npm init
npm i bobril --save
```

## First Simple Component - Hello

Bobril component can be written as a `class` extending base `Component` class. The base class can have generic parameter to define its `data`. This data works as an input from the outside usage.

Content of component is defined by return value of `render()` method. The XML-like syntax for return value is called TSX and it creates an object of type `IBobrilChildren` (`bobril` nodes). TSX is optional and you can use standard TypeScript syntax for creating `bobril` nodes as objects.

Input data are accessible by `this.data`.

The last line initialize the `bobril` application with its entry node.

<!-- # from-file: ./examples/hello/index.tsx -->

```tsx
import * as b from "bobril";

interface IHelloData {
  name: string;
}

class Hello extends b.Component<IHelloData> {
  render(): b.IBobrilChildren {
    return (
      <>
        <h1>Hello {this.data.name}</h1>
        <p>
          This is your first <strong>bobril</strong> application.
        </p>
      </>
    );
  }
}

b.init(() => <Hello name="Developer" />);

```

[Preview example](./hello/index.html)

Now just start `bobril-build` and let it watch your code for changes.

```bash
bb
```

To Preview you application visit http://localhost:8080 .

## Bring it to life with Stateful Component

Component can work beside input data also with its internal state. This state is accessible by `this` keyword. To re-invoke render after change of some part of internal state the `b.invalidate(this)` function has to be called.

This example also contains usage of another life-cycle methods:

`init` - called when bobril node is added to Virtual DOM for the first time

`destroy` - called before bobril node is removed from Virtual DOM

Timer component use them for setup and clear the interval.

The `<button>` html element is used to reset the timer. Reset is implemented as a `callback` (event delegation) for handling normalized `onChange` event of the element. This normalized event handlers are automatically accessible on html elements or their handling can be written as a public life-cycle method of `Component` class delegated up as a callback in input data.

<!-- # from-file: ./examples/timer/index.tsx -->

```tsx
import * as b from "bobril";

class Timer extends b.Component {
  private _time: number = 0;
  private _intervalId: number = 0;

  init(): void {
    this._intervalId = window.setInterval(() => this.tick(), 1000);
  }

  render(): b.IBobrilChildren {
    return (
      <>
        <p>Time: {this._time} [s]</p>
        <button onClick={() => this.reset()}>RESET</button>
      </>
    );
  }

  destroy(): void {
    window.clearInterval(this._intervalId);
  }

  private tick(): void {
    this._time++;
    b.invalidate(this);
  }

  private reset(): boolean {
    this._time = 0;
    b.invalidate(this);
    return true;
  }
}

b.init(() => <Timer />);
```

[Preview example](./timer/index.html)

## Todo Application

Combination of several `components` with input `data`, `event delegation` and `internal state` allows to create full Todo application.

Following component displays list of items given from its parent. It uses `key` attribute with unique id of item to assure clear identification of `<li>` bobril node . Otherwise it could cause mismatch of internat states.

<!-- # from-file: ./examples/todo/components/list.tsx -->

```tsx
import * as b from "bobril";

export interface IItem {
  id: number;
  text: string;
}

export interface IListData {
  items: IItem[];
}

export function List(data: IListData): b.IBobrilNode {
  return (
    <ul>
      {data.items.map(item => (
        <ListItem {...item} />
      ))}
    </ul>
  );
}

function ListItem(data: IItem): b.IBobrilNode {
  return <li key={data.id}>{data.text}</li>;
}

```

Next component consists of input elements to get data from user. The result is delegated up with event callback. It also uses `virtual CSS` created by `b.styleDef` definition to setup margin between elements.

<!-- # from-file: ./examples/todo/components/form.tsx -->

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

Finally the main component maintains list of items and composes the tree of final application.

 <!-- # from-file: ./examples/todo/index.tsx -->

```tsx
import * as b from "bobril";
import { List, IItem } from "./components/list";
import { Form } from "./components/form";

class Todo extends b.Component {
  private _todos: IItem[] = [];

  render(): b.IBobrilChildren {
    return (
      <>
        <h1>TODO</h1>
        <List items={this._todos} />
        <Form onSubmit={text => this.add(text)} />
      </>
    );
  }

  private add(text: string): void {
    this._todos.push({ id: Date.now(), text });
    b.invalidate(this);
  }
}

b.init(() => <Todo />);

```

[Preview example](./todo/index.html)
