# Bobflux

**[Download sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleAppBobflux)** 
### Introduction 
In the [previous article](http://www.codeproject.com/Articles/1044425/Bobril-I-Getting-started), we have learned about how to create a page (view part of a web application) by bobril. In this article, we will learn how to add an application logic by **bobflux**. 
- [Bobril - I - Getting Started](http://www.codeproject.com/Articles/1044425/Bobril-I-Getting-started)
- [Bobril - II - Bobflux Application Architecture](http://www.codeproject.com/Articles/1055921/Bobril-II-Bobflux-application-architecture)
- [Bobril - III - Localizations and Formatting](http://www.codeproject.com/Articles/1058132/Bobril-III-Localizations-and-formatting)
- [Bobril - IV - Routing](http://www.codeproject.com/Articles/1058609/Bobril-IV-Routing)
- [Bobril - V - Bobril-build](https://www.codeproject.com/Articles/1167901/bobril-build)
- [Bobril - VI - BobX Application Store Management](https://www.codeproject.com/Articles/1201171/Bobril-VI-BobX-Application-Store-Management)

### Background 
Bobflux is a pure functional frontend application architecture based on _flux_ and inspired by _reflux_ and _redux_. It is written by Karel Steinmetz (software developer in GMC Software Technology). The bobflux lifecycle can be described by the following picture: 

    1. Application has some **state**
    2. View is rendered according to this state
    3. View calls actions with handlers created by **action creator**
    4. Actions change the state

For more information, see [project pages](https://github.com/karelsteinmetz/bobflux/). 

### Let's start 

We will create a simple TODO application. At first, we need to have prepared _bobril-build_ on computer. Follow the steps in [previous article](http://www.codeproject.com/Articles/1044425/Bobril-I-Getting-started) to perform bobril-build installation. 

Now you can start a new project again or use a predefined skeleton simpleApp from [bobril-build github repository](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/Bobris/bobril-build/tree/master/examples/simpleApp). Following example will use it. To get final code [download the full sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleAppBobflux). 

### Add bobflux to Application 

Run following commands in the root of application folder:
``` bash
npm i
npm i bobflux --save
bb
```
### State 
At first, we need to prepare application **state**, its **cursor** and function for creating the default state. To define the state, add file _src/state.ts_ with the following content:
``` javascript
import * as flux from 'bobflux';

export interface ITodoAppState extends flux.IState {
    todos: string[];
    todoName: string;
}

export const todoAppCursor: flux.ICursor<ITodoAppState> = {
    key: ''
};

export function createDefaultTodoAppState(): ITodoAppState {
    return {
        todos: [],
        todoName: ''
    };
}
```
**State** is a place where to store application data. The difference between a state and a context is that context stores the data needed only for a component itself and the rest of an application doesn't care about them. It is e.g. an information whether a component for section is collapsed or not (when you don't need to manage it from the outside). 

In our todo application, we will need to store the list of todos and currently written name of todo so we have to define ITodoAppState for these data. 

**Cursor** defines a path (key) to the state in an aplication state. In our sample, we will work only with the root application cursor so the path in todoAppCursor.key is empty. In real application it is recommended to define as much specific cursors as possible to get the best bobflux performance advantages. It means e.g. to create cursor like: 
``` javascript
exportconst todoNameCursor: flux.ICursor<ITodoAppState> = {
    key: 'todoName'
};
```
For the simplicity our example uses only the root todoAppCursor. Now, we need to initialize bobflux and provide the application state to it, so change _src/app.ts_ to looks like following:
``` javascript
import * as b from 'bobril';
import * as flux from 'bobflux';
import * as todoState from './state';
import { mainPage } from './mainPage';

flux.bootstrap(todoState.createDefaultTodoAppState());

b.routes(
    b.route({ handler: mainPage })
);
```
Now, we have prepared the application state that can be modified by calling actions. Actions Actions change the state by a handler on a specific sub-state defined by the cursor. In our todo example, we will need to perform two actions: 

    1. Change the current name of todo according to a textbox value
    2. Add the written todo to the list of todos

So we will add the file _src/actions/changeTodoName.ts_:
``` javascript
import * as flux from 'bobflux';
import { ITodoAppState, todoAppCursor } from'../state';

export const changeTodoName = 
    flux.createAction(todoAppCursor, (state: ITodoAppState, todoName: string): ITodoAppState => {

        if (todoName === state.todoName)
            return state;

        return flux.shallowCopy(state, copy => { copy.todoName = todoName; });
    });

export default changeTodoName;
```
and _src/actions/addTodo.ts_: 
``` javascript
import * as flux from 'bobflux';
import { todoAppCursor } from '../state';

export const addTodo = flux.createParamLessAction(todoAppCursor, state => {
    if (!state.todoName || state.todoName.trim().length === 0)
        return state;

    return flux.shallowCopy(state, copy => {
        copy.todos = [...state.todos, state.todoName];
        copy.todoName = '';
    });
});

export default addTodo;
```
The changeTodoName action is defined by the function createAction from bobflux which accepts the cursor of a state which it will change and the handler which will be used for the change. In the beginning of the handler is a check whether we want to change something or not. 

- If not, then we will return the original instance of the state.
- If yes, then we will create a shallow copy of the state and return the modified copy.

Bobflux follows the principles of **immutability** to keep the best performance. It compares an input state with an output state and if it is different, then it calls b.invalidate to re-render the view. It is necessary to take care about the copied object properties. If there is some referencial object like an array todos in the addTodo action, it has to be copied as well. Composing the Page with bobflux Now, we have everything prepared to be used on the page of the todo application. So let's change the _src/mainPage.ts_ to look like this:
``` javascript
import * as b from 'bobril';
import * as flux from 'bobflux';
import { todoAppCursor } from './state';
import { changeTodoName } from './actions/changeTodoName';
import { addTodo } from './actions/addTodo';
import { button } from './components/button';
import { textbox } from './components/textbox';
import { p } from './components/paragraph';
import { h1 } from './components/header';

export const mainPage = b.createComponent({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
        const state = flux.getState(todoAppCursor);
        me.children = [
            h1({}, 'TODO'),
            p({}, [
                textbox({ 
                    value: state.todoName, 
                    onChange: newValue => changeTodoName(newValue) 
                }),
                button({ title: 'ADD', onClick: () => addTodo() })
            ]),
            state.todos.map(item => p({}, item)),
            p({}, `Count: ${state.todos.length}`)
        ];
    }
});

export default mainPage;
```
The components definition is not the subject of this article, so you can use definitions in the attached source code. 

You can see that a page resolves the current application state by the function getState with defined todoAppCursor. It can be done this way because bobflux initiates rendering of the page on every change in the state. T
he textbox and button components use the defined actions in their onChange and onClick callbacks so the user interactions from view initiates the action calls. 

And finally in the end of the render function is a mapped array of todos to 'p' tags with todo names. 

Now, we are able to open the application in a browser and see how it works. Yes, it is really that simple. 

To debug the state history, you can also try the bobflux-monitor (see the [project pages](https://github.com/keeema/bobflux-monitor) or the sample). 

Bobflux also contains few performance helpers like createRouteComponent to optimalize rendering of component or provident the state in context etc. 

To get more information see the project github pages: [https://github.com/karelsteinmetz/bobflux](https://github.com/karelsteinmetz/bobflux)