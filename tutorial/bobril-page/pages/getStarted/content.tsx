import * as b from "bobril";

export class Content extends b.Component {
  static id: string = "get-started";
  render(): b.IBobrilChildren {
    return content;
  }
}

export const content: b.IBobrilNode = <><h1 id="get-started">{`Get started`}</h1>
<p>{`Go through this short tutorial and learn how easy you can create your own production-ready application.`}</p>
<h2 id="setup-build-environment">{`Setup build environment`}</h2>
<p>{`Bobril is distributed with its own build system based on `}<code>NodeJS</code>{` and `}<code>.NET Core</code>{` providing all necessary tasks like compilation, minification, translations, sprites, styles etc. You can install it globally by `}<code>npm</code>{`.`}</p>
<pre><code class="language-bash">{`npm i bobril-build -g`}</code></pre>
<h2 id="prepare-application-package">{`Prepare application package`}</h2>
<p>{`You can initialize your application as an usual `}<code>npm</code>{` package by following.`}</p>
<pre><code class="language-bash">{`npm init
npm i bobril --save`}</code></pre>
<h2 id="first-simple-component---hello">{`First Simple Component - Hello`}</h2>
<p>{`Bobril component can be written as a `}<code>class</code>{` extending base `}<code>Component</code>{` class. The base class can have generic parameter to define its `}<code>data</code>{`. This data works as an input from the outside usage.`}</p>
<p>{`Content of component is defined by return value of `}<code>render()</code>{` method. The XML-like syntax for return value is called TSX and it creates an object of type `}<code>IBobrilChildren</code>{` (`}<code>bobril</code>{` nodes). TSX is optional and you can use standard TypeScript syntax for creating `}<code>bobril</code>{` nodes as objects.`}</p>
<p>{`Input data are accessible by `}<code>this.data</code>{`.`}</p>
<p>{`The last line initialize the `}<code>bobril</code>{` application with its entry node.`}</p>


<pre><code class="language-tsx">{`import * as b from "bobril";

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
`}</code></pre>
<p><a href="./hello/index.html">{`Preview example`}</a></p>
<p>{`Now just start `}<code>bobril-build</code>{` and let it watch your code for changes.`}</p>
<pre><code class="language-bash">{`bb`}</code></pre>
<p>{`To Preview you application visit `}<a href="http://localhost:8080">http://localhost:8080</a>{` .`}</p>
<h2 id="bring-it-to-life-with-stateful-component">{`Bring it to life with Stateful Component`}</h2>
<p>{`Component can work beside input data also with its internal state. This state is accessible by `}<code>this</code>{` keyword. To re-invoke render after change of some part of internal state the `}<code>b.invalidate(this)</code>{` function has to be called.`}</p>
<p>{`This example also contains usage of another life-cycle methods:`}</p>
<p><code>init</code>{` - called when bobril node is added to Virtual DOM for the first time`}</p>
<p><code>destroy</code>{` - called before bobril node is removed from Virtual DOM`}</p>
<p>{`Timer component use them for setup and clear the interval.`}</p>
<p>{`The `}<code>&lt;button&gt;</code>{` html element is used to reset the timer. Reset is implemented as a `}<code>callback</code>{` (event delegation) for handling normalized `}<code>onChange</code>{` event of the element. This normalized event handlers are automatically accessible on html elements or their handling can be written as a public life-cycle method of `}<code>Component</code>{` class delegated up as a callback in input data.`}</p>


<pre><code class="language-tsx">{`import * as b from "bobril";

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

b.init(() => <Timer />);`}</code></pre>
<p><a href="./timer/index.html">{`Preview example`}</a></p>
<h2 id="todo-application-and-functional-components">{`Todo Application and Functional Components`}</h2>
<p>{`Combination of several `}<code>components</code>{` with input `}<code>data</code>{`, `}<code>event delegation</code>{` and `}<code>internal state</code>{` allows to create full Todo application.`}</p>
<p>{`Following `}<code>functional components</code>{` display list of items given from its parent. It uses `}<code>key</code>{` attribute with unique id of item to assure clear identification of `}<code>&lt;li&gt;</code>{` bobril node . Otherwise it could cause mismatch of internat states.`}</p>


<pre><code class="language-tsx">{`import * as b from "bobril";

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
`}</code></pre>
<p>{`Next component consists of input elements to get data from user. The result is delegated up with event callback. It also uses `}<code>virtual CSS</code>{` created by `}<code>b.styleDef</code>{` definition to setup margin between elements.`}</p>


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
<p>{`Finally the main component maintains list of items and composes the tree of final application.`}</p>
 

<pre><code class="language-tsx">{`import * as b from "bobril";
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
`}</code></pre>
<p><a href="./todo/index.html">{`Preview example`}</a></p>
</>;