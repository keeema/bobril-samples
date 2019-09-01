import * as b from "bobril";

export class Content extends b.Component {
  static id: string = "more-tutorials";
  render(): b.IBobrilChildren {
    return content;
  }
}

export const content: b.IBobrilNode = <><h1 id="more-tutorials">{`More tutorials`}</h1>
<p>{`Explore more possibilities offered by bobril and its additional packages.`}</p>
<h2 id="nesting-components">{`Nesting Components`}</h2>
<h3 id="simple-nesting">{`Simple nesting`}</h3>
<p>{`Some components are created just because to wrap some other components (to add styling, additional functionality etc.). To deal with nesting in components tree there is a special `}<code>input data</code>{` property `}<code>children</code>{`. It can be defined manually as in example or inherited from interface `}<code>b.IDataWithChildren</code>{`.`}</p>


<pre><code class="language-tsx">{`import * as b from "bobril";

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
`}</code></pre>
<p><a href="./hello-with-children/index.html">{`Preview example`}</a></p>
<h3 id="better-todo-with-slots-for-layout">{`Better Todo with slots for layout`}</h3>
<p>{`Next example improves previous Todo example and shows more complex implementation with special component for Layout.`}</p>
<p>{`Following list allows to check state of task in todo list. `}<code>Checked</code>{` event is delegated up with callback `}<code>onItemChecked</code>{` in `}<code>input data</code>{`.`}</p>


<pre><code class="language-tsx">{`import * as b from "bobril";
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
`}</code></pre>
<p><code>ListItem</code>{` component reflects the `}<code>done</code>{` state with conditional apply of `}<code>strikeOut</code>{` style.`}</p>


<pre><code class="language-tsx">{`import * as b from "bobril";
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
`}</code></pre>
<p>{`Form is the same as in previous example.`}</p>


<pre><code class="language-tsx">{`import * as b from "bobril";

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
`}</code></pre>
<p>{`Finally we come to layout component. It defines its `}<code>children</code>{` as object with properties of type `}<code>b.IBobrilChildren</code>{` for each specific part instead of one main `}<code>b.IBobrilChildren</code>{`. Properties are accessible in `}<code>input data</code>{` object in property `}<code>children</code>{`.`}</p>
 

<pre><code class="language-tsx">{`import * as b from "bobril";

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
`}</code></pre>
<p>{`Now the layout can be used in `}<em>{`index.tsx`}</em>{`. This pattern for layout is called `}<code>named slots projection</code>{`.`}</p>
<p>{`There is also new function `}<code>edit</code>{` for editing the current state of Todo Item.`}</p>
 

<pre><code class="language-tsx">{`import * as b from "bobril";
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
`}</code></pre>
<p><a href="./todo-advanced/index.html">{`Preview example`}</a></p>
<h2 id="maintain-state-with-bobx">{`Maintain state with BobX`}</h2>
<p>{`There is no special logic for maintaining the state in previous examples and reactions for any event is triggered manually with `}<code>b.invalidate</code>{`.`}</p>
<p>{`To remove those duplicate calls and make state really reactive and maintainable there exists `}<code>BobX</code>{` library. It uses `}<code>observable</code>{` pattern and works the same way as the original `}<code>mobx</code>{` but with few improvements.`}</p>
<h3 id="installation">{`Installation`}</h3>
<p><code>BobX</code>{` is standard npm package so just type in your terminal:`}</p>
<pre><code class="language-bash">{`npm i bobx --save`}</code></pre>
<h3 id="bobx-store">{`BobX store`}</h3>
<p>{`It is a good practice too keep domain data standalone from view. Following example shows how to change previous Todo application to use bobx.`}</p>
<p>{`Next code defines `}<code>TodoStore</code>{` with private list of `}<code>_todos</code>{`. This property is decorated with `}<code>@observable</code>{` decorator. Every bobril node created from component which reads `}<code>_todos</code>{` in its render `}<em>{`(observer)`}</em>{` is automatically re-rendered on any change of `}<code>_todos</code>{` `}<em>{`(observable subject)`}</em>{`.`}</p>


<pre><code class="language-tsx">{`import { observable } from "bobx";
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
`}</code></pre>
<p>{`Such store is ready to be used in main component of Todo application.`}</p>
 

<pre><code class="language-tsx">{`import * as b from "bobril";
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
`}</code></pre>
<p><a href="./todo-advanced-bobx/index.html">{`Preview example`}</a></p>
<h3 id="basic-optimizations">{`Basic optimizations`}</h3>
<p><code>BobX</code>{` provides several strategies to optimize watching of observable subjects to watch only what is really needed. Those are basic tools:`}</p>
<p><code>@observable</code>{` - watches objects recursively - it stops recursion only on property with prototype (class objects)`}</p>
<p><code>@observable.shallow</code>{` - watches objects reference and only first level of properties`}</p>
<p><code>@observable.ref</code>{` - watches objects only reference level`}</p>
<p><code>@computed</code>{` - special decorator creating memoization on getter using just `}<code>observable</code>{` values for its computation`}</p>
<h2 id="testing">{`Testing`}</h2>
<p><code>Bobril-build</code>{` provides automatic run of tests out-of-the box.`}</p>
<p>{`The only condition is to have test files named with postfix `}<em>*{`spec.ts`}</em></p>
<p>{`It has automatically referenced type definitions for `}<code>jasmine</code>{` framework and run all tests on every rebuild. Results can be found in terminal.`}</p>
 

<pre><code class="language-tsx">{`import { TodoStore } from "./store";

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
`}</code></pre>
</>;