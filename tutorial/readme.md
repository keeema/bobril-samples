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

## First Hello component

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
