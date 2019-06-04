![Bobril Logo](./resources/bobril-logo-small.png)

# Bobril

- TypeScript Framework for fast development of single-page applications for web
- Component-based - compose page from encapsulated UI or virtual components
- Optimized for high speed, small size and great developer experience
- Distributed with eco-system for build, translations, state management etc.
- Using Virtual DOM to ensure maximum effectiveness

# Getting started

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

```jsx
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

## Bring it to life with Stateful Component

Component can work beside input data also with its internal state. This state is accessible by `this` keyword. To re-invoke render after change of some part of internal state the `b.invalidate(this)` function has to be called.

This example also contains usage of another life-cycle methods:

`init` - called when bobril node is added to Virtual DOM for the first time

`destroy` - called before bobril node is removed from Virtual DOM

Timer component use them for setup and clear the interval.

The `<button>` html element is used to reset the timer. Reset is implemented as a `callback` for handling normalized `onChange` event of the element. This normalized event handlers are automatically accessible on html elements or their handling can be written as a public life-cycle method of `Component` class delegated up as a callback in input data.

```jsx
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
