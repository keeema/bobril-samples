[//]: <> (bobrilComIgnoreStart)

# Bobril - Getting Started

[//]: <> (bobrilComIgnoreEnd)

**[Download sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleBasic)**
 
[//]: <> (bobrilComIgnoreStart)

### Introduction

In this article, we will learn the basics about bobril and create a simple application with one component. Then, we will take a look at how to setup the project simply by the npm.

- [Bobril - I - Getting Started](https://github.com/keeema/bobril-samples/blob/master/articles/01_bobril-getting-started.md)
- [Bobril - II - Bobflux Application Architecture](https://github.com/keeema/bobril-samples/blob/master/articles/02_bobril-bobflux.md)
- [Bobril - III - Localizations and Formatting](https://github.com/keeema/bobril-samples/blob/master/articles/03_bobril-localizations.md)
- [Bobril - IV - Routing](https://github.com/keeema/bobril-samples/blob/master/articles/04_bobril-routing.md)
- [Bobril - V - Bobril-build](https://github.com/keeema/bobril-samples/blob/master/articles/05_bobril-bobril-build.md)
- [Bobril - VI - BobX Application Store Management](https://github.com/keeema/bobril-samples/blob/master/articles/06_bobril-bobx.md)

[//]: <> (bobrilComIgnoreEnd)

### Background

Bobril is a component-oriented framework inspired by React and Mithril. It combines advantages from both of them. It is **fast, low size **framework with rendering based on Virtual DOM. The main focus is on speed and simplicity of code generation. Bobril is about 8x faster than react (see [vdom-benchmark](http://vdom-benchmark.github.io/vdom-benchmark/)).

Content and behavior of any page can be defined simply by composing JavaScript objects.

The page content rendering is based on comparison of Virtual DOMs. The application has some state in time and bobril application generates the Virtual DOM according to this state. Virtual DOM is an object representation of the resultant DOM. If some state-changing event occurs and the previous Virtual DOM is different than currently generated Virtual DOM, the real DOM will change according to this change.

Bobril is written by Boris Letocha (software architect and developer in GMC Software Technology).

> Quote: Boris Letocha, author of the framework

> Besides size and speed benefits, bobril has some very useful features which you will not find elsewhere. For example transparent emulation pointer-events:none or user-select:none in all browsers down to IE9. Transparent unification of mouse and touch events across all supported browsers including Chrome, IE10, IE11. Another feature I call it "Virtual CSS" - you can define styles in JS and it will transparently build optimal CSS in runtime. Image spriting. Image recoloring. Tight integration with TypeScript. Bobril-build enhancing your code during compile time, does optimal bundling similar to Rollup. Bobril removed some of limitations of React like component root does not need to be just one element. Directly includes Router and Drag and drop features. And much much more.

You can find more detailed information and examples [here.](https://github.com/Bobris/Bobril)

### How to Start

Let's start with a simple TypeScript (typed JavaScript) example - traditional Hello World.

#### Installing Build System

The easiest way is to use directly the prepard build system bobril-build, which contains optimalized functionality for building _bobril_ based applications, testing, translations, etc. Bobril-build requires node.js >= 6.x.x and npm >=3.x.x. To install bobril build, pass the following command to the command line:
``` bash
npm i bobril-build -g
```
We also recommend to install the _tslint_ bobril-build plugin which generates _tslint.json_ file for the project:
``` bash
npm i typescript tslint -g
bb plugins -i bb-tslint-plugin
```
TSLint checks your TypeScript code for readability, maintainability, and functionality errors.

Now we can start with creating the project. So create some folder, e.g. _sample1_, create an empty file, _index.ts _in this folder and pass the following commands in its root:
``` bash
npm init
npm i bobril --save
bb
```
These commands will:

1. Initialize project as npm package. You can hit Enter for all questions.
2. Install the bobril dependency
3. Run bobril-build

Now the bobril-build runs in the interactive mode, which means it watches your code for changes, builds the application to the memory file system and serves it on the address [http://localhost:8080](http://localhost:8080/).

The built application has resolved all dependencies, created the _index.html_, source maps for debbuging and much more stuff you usually have to do manually in another frameworks.

#### Let's Write a Code

For this purpose, we recommend to use the Visual Studio Code with installed tslint and bobril plugins. Bobril-build is optimized for this editor and contains its own bobril extension with snippets and analysis tools.

So, open the _sample1_ folder in editor and change _index.ts_ to look like the following:
``` javascript
import * as b from 'bobril';

b.init(() => {
    return { tag: 'h1', children: 'Hello World!' };
});
```
The b imported from the bobril package represents the bobril world with all its available basic functions. The init function initializes the application with function returning the Virtual DOM. In the example is the Virtual DOM represented with the only one node - 

IBobrilNode - of tag _'h1'_ with content _'Hello World'_.

Yes, it is that simple. Except the string, the children property can be assigned with another IBobrilNode or with an array of IBobrilNode, so we can compose the whole tree of the DOM.

Now take a look to the [http://localhost:8080](http://localhost:8080/) address in your browser. You can see your first application written with bobril!

#### Components

Bobril is a framework focusing on components and for Virtual DOM composition we can define easy-to-use components. Let's prepare a **button** component.

Add a new file _button.ts_ with the following content:
``` javascript
import * as b from 'bobril';

export interface IButtonData {
    title: string;
    onClick?: () => void;
}

interface IButtonCtx extends b.IBobrilCtx {
    data: IButtonData;
}

export const button = b.createComponent<IButtonData>({
    render(ctx: IButtonCtx, me: b.IBobrilNode) {
        me.tag = 'button';
        me.children = ctx.data.title;
    },
    onClick(ctx: IButtonCtx): boolean {
        if (ctx.data.onClick) {
            ctx.data.onClick();
        }

        return true;
    }
});

export default button;
```
The b.createComponent function accepts an object defining the behaviour of component in its lifecycle. This lifecycle defining functions like init, render, postRender etc. are defined by interface IBobrilComponent. The description of each function can be found in comments of _bobril_ in its _index.ts_ file. Our button uses the render and onClick functions which accept the ctx (context) as a first parameter.

Context is a storage for the current state of the specific component instance, e.g. for each specific button - the specific node in Virtual DOM.

The context interface IButtonCtx extending the IBobrilCtx has predefined member data which is automatically assigned by bobril in Virtual DOM tree rendering. It is prepared to be used with own IButtonData interface definition.

This data member is designed to be used as an input information for a component. It can define how the component should look like and behave. So the button in the example has title and onClick callback defined from the outside.

The data onClick callback is called in the onClick lifecycle function defined again by the IBobrilComponent interface.

Now the button component is ready to be used in _index.ts_ so we can change it to look like the following:
``` javascript
import * as b from 'bobril';
import { button } from './button';

b.init(() => {
    return [
        { tag: 'h1', children: 'Hello World!' },
        button({ 
            title: 'Click Me!', 
            onClick: () => alert('Yeah! I was clicked!') 
        })
    ];
});
```
After automatic recompile, you can open this page and see how the **bobril** is working.

The classic import with alias can be used as well:
``` javascript
import * as btn from './button';
```
#### Bring It to Life

If we need to make some operations (e.g. as a reaction on some backend event), change the state and tell bobril that the re-render of Virtual DOM is needed, we can simply call the b.invalidate() function and the bobril re-calls the function provided to the b.init function. To try it, we can simply change the code:
``` javascript
import * as b from 'bobril';
import { button } from './button';

let counter = 0;

b.init(() => {
    setTimeout(() => { counter++; b.invalidate(); }, 1000);

    return [
        { tag: 'h1', children: 'Hello World!' },
        button({ 
            title: 'Click Me!', 
            onClick: () => alert('Yeah! I was clicked!') 
        }),
        { tag: 'p', children: counter.toString() }
    ];
});
```
It adds a new element with a counter increasing every 1000 ms. If you need to call b.invalidate inside of some component, use it with ctx as a parameter, so b.invalidate(ctx). It will perform rendering of the specific component only.

Bobril contains lots of other really useful functions like styleDef to define styles as objects and prepare them for use by style function. Other useful functions are routes and route to define routing between pages in application, etc.

### Notes

To build, minify and bundle your application to _dist_ folder, just type the command:
``` bash
bb b
```
For more information about bobril and bobril-build, please visit the github pages below:

- [https://github.com/Bobris/Bobril](https://github.com/Bobris/Bobril)
- [https://github.com/Bobris/bobril-build](https://github.com/Bobris/bobril-build)
