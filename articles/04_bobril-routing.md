# Bobril - Routing
**[Download sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleAppRouting)**

In this article, we will learn how to handle routes definition by bobril embedded routing mechanism.

- [Bobril - I - Getting Started](https://github.com/keeema/bobril-samples/blob/master/articles/01_bobril-getting-started.md)
- [Bobril - II - Bobflux Application Architecture](https://github.com/keeema/bobril-samples/blob/master/articles/02_bobril-bobflux.md)
- [Bobril - III - Localizations and Formatting](https://github.com/keeema/bobril-samples/blob/master/articles/03_bobril-localizations.md)
- [Bobril - IV - Routing](https://github.com/keeema/bobril-samples/blob/master/articles/04_bobril-routing.md)
- [Bobril - V - Bobril-build](https://github.com/keeema/bobril-samples/blob/master/articles/05_bobril-bobril-build.md)
- [Bobril - VI - BobX Application Store Management](https://github.com/keeema/bobril-samples/blob/master/articles/06_bobril-bobx.md)

### Background

Bobril is a component-oriented framework written by Boris Letocha (software architect and developer in GMC Software Technology). For more information, [see the first article](https://github.com/keeema/bobril-samples/blob/master/articles/01_bobril-getting-started.md).

### Using the Code

#### Preparing Environment

At first, we need to have prepared _bobril-build_ on computer. Follow the steps in [first article](https://github.com/keeema/bobril-samples/blob/master/articles/01_bobril-getting-started.md) to perform bobril-build installation.

Now you can start a new project again or use a predefined skeleton simpleApp from [bobril-build github repository](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/Bobris/bobril-build/tree/master/examples/simpleApp).

Following example will use it. To get final code [download the full sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleAppRouting).

#### Defining Routes

Bobril has few methods for defining the application route tree:
- b.route - defines a route url, name, handler and a list of sub-routes
- b.routes - registers routes to the application and calls b.init
- b.routeDefault - defines the default route if no sub-route is specified in the current url

Example of the route definition in _app.ts_:
``` javascript
import * as b from 'bobril';
import { mainPage } from './page';
import { pageOne } from './pages/pageOne';
import { pageTwo } from './pages/pageTwo';

b.routes(
    b.route({ handler: mainPage }, [
        b.route({ url: '/one', name: 'one', handler: pageOne }),
        b.route({ url: '/two/:text?', name: 'two', handler: pageTwo }),
        b.routeDefault({ handler: pageOne })
    ])
);
```
The whole application will be handled by a handler mainPage with sub-routes one and two on urls _'/one'_ and _'/two'_ handled by handlers pageOne and pageTwo.

The default handler pageOne will be used when no sub-route is specified. The url for page two contains a parameter specification after a second slash. It is defined by a colon and a name of the parameter. The question mark defines the parameter as optional. Route parameters can then be found in the handler's context at ctx.data.routeParams.

#### Handling Routes in Pages

Now, we need to define the mainPage to render some own content and the visual content of the active sub-route. To do this, we will use a function provided in component's ctx.data.activeRouteHandler, so we can change the code of _page.ts_ as the following:
``` javascript
import * as b from 'bobril';

exportconst mainPage = b.createComponent({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
        me.children = [
            tag('h1', 'Routing example'),
            tag('hr'),
            tag('div', me.data.activeRouteHandler()),
        ];
    }
});
```
This code will render a header, a line and the visual content of current active sub-route.

Now, we need to define sub-pages and transitions between these pages. Bobril offers the following functions and interface for these purposes:

- b.IRouteTransition - interface for a transition definition (target name, parameters etc.)
- b.createRedirectReplace - creates IRouteTransition object for redirect without saving history
- b.createRedirectPush - creates IRouteTransition object for redirect with saving history
- b.runTransition - runs a transition according to an input IRouteTransition object
- b.link - changes an input IBobrilNode to a link to the route of a specified name and with specified optional params

Example of the redirect definition from the page one to the page two in _pages/pageOne.ts_:
``` javascript
import * as b from 'bobril';
import { textbox } from '../components/textbox';
import { button } from '../components/button';

let value = '';

export const pageOne = b.createComponent({
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
        me.children = [
            textbox({ value, onChange: (newVal) =>; { value = newVal; b.invalidate(ctx); } }),
            button({
                title: 'Confirm',
                onClick: () =>; {
                    b.runTransition(b.createRedirectPush('two', { text: value }));
                    returntrue;
                }
            })
        ];
    }
});
```
The code in a button's onClick callback creates and runs a transition to the page two with an object defining the value of a text parameter.

The transition above has to be handled by the pageTwo handler defined in _pages/pageTwo.ts_:
``` javascript
import * as b from 'bobril';
import { tag } from '../helper';
import { loggedIn } from '../page';

export interface IData {
    routeParams: { text?: string };
}

export interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export const pageTwo = b.createComponent&lt;IData>;({
    render(ctx: ICtx, me: b.IBobrilNode): void {
        let value = (ctx.data.routeParams.text || '').trim();
        me.children = [
            tag('p', 'Your text: ' + (!!value ? value : 'nothing')),
            b.link(tag('a', 'Go back'), 'one')
        ];
    }
});
```
The page receives the text parameter value in its ctx.data.routeParams.text so we can specify the context and data interfaces and use text in the render function of a page component. It also defines a link node to the page one by function b.link.

#### Transition Availability

There are some cases when we need to manage whether a current page on a current route is available or whether we can leave the current page. For these purposes, we can use the following static functions of IBobrilComponent:

- canActivate - It can stop the current transition in a target handler by returning false or redirect to the new specified transition
- canDeactivate - Can stop the current transition in the a source handler by returning false or redirect to the new specified transition

So for example, we can handle leaving the page one with empty value of a textbox by adding canDeactivate function definition to the page one component definition in _pages/pageOne.ts_:
``` javascript
canDeactivate() {
    return !!value.trim() || confirm('The textbox is empty. Are you sure?');
}
```
or handle the not logged user on accessing the page two by adding canActivate function definition to the page two component definition in _pages/pageTwo.ts_:
``` javascript
canActivate() {
    if (loggedIn)
        returntrue;
    alert('You are not logged in!');
    return b.createRedirectReplace('one');
}
```
**Note**: The loggedIn variable is declared and set in mainPage and imported to the pageTwo. See the _page.ts_ in the attached [full sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleAppRouting).

### Summary

As you can see, the bobril framework contains really simple routing mechanism able to fulfill all standard requirements.

[Download the full sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleAppRouting) for the whole application with all the mentioned functions.