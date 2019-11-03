## Routing

### Defining Routes

Bobril has few methods for defining the application route tree:

- `b.route` - defines a route url, name, handler and a list of sub-routes
- `b.routes` - registers routes to the application and calls `b.init`
- `b.routeDefault` - defines the default route if no sub-route is specified in the current url

<!-- # from-file: ../../examples/routing/index.tsx -->

```tsx
import * as b from "bobril";
import { PageOne } from "./pages/pageOne";
import { PageTwo } from "./pages/pageTwo";
import { MainPage } from "./pages/main";

b.routes(
  b.route({ handler: data => <MainPage {...data} /> }, [
    b.route({ url: "/one", name: "one", handler: data => <PageOne {...data} /> }),
    b.route({ url: "/two/:text?", name: "two", handler: data => <PageTwo {...data} /> }),
    b.routeDefault({ handler: data => <PageOne {...data} /> })
  ])
);

```

[Preview example](../../examples/routing/dist/index.html)

The whole application will be handled by a handler `MainPage` with sub-routes _one_ and _two_ on urls `/one` and `/two/` handled by handlers `PageOne` and `PageTwo` and the default handler `PageOne` will be used when no sub-route is specified.

The url for page _two_ contains a parameter specification after a second slash. It is defined by a **colon** and a **name** of the parameter. The **question mark** defines the parameter as optional. Route parameters can then be found in the input data prpoerty `routeParams`.

### Handling Routes

Now we will write a `MainPage` component to render some own content and the visual content of the active sub-route. To do this a function provided in `data.activeRouteHandler` is used.

<!-- # from-file: ../../examples/routing/pages/main.tsx -->

```tsx
import * as b from "bobril";

export let loggedIn = false;

export class MainPage extends b.Component<b.IRouteHandlerData> {
  render(): b.IBobrilNode {
    return (
      <>
        <h1>Routing</h1>
        <p>
          Logged In:
          <input type="checkbox" value={loggedIn} onChange={value => (loggedIn = value)} />
        </p>
        <hr />
        {this.data.activeRouteHandler()}
      </>
    );
  }
}

```

This component renders a header, a line and the visual content of current active sub-route.

### Transitions

Other part is to define sub-pages and transitions between those pages. Bobril offers the following functions and interface to define and run transitions between routes:

- `b.IRouteTransition` - interface for a transition definition (target name, parameters etc.)
- `b.createRedirectReplace` - creates IRouteTransition object for redirect without saving history
- `b.createRedirectPush` - creates IRouteTransition object for redirect with saving history
- `b.runTransition` - runs a transition according to an input IRouteTransition object
- `b.link` - changes an input IBobrilNode to a link to the route of a specified name and with specified optional params
- `<Link>` - b.link functiona s a `component`

Example of the redirect definition from the `PageOne` to the `PageTwo`:

<!-- # from-file: ../../examples/routing/pages/pageOne.tsx -->

```tsx
import * as b from "bobril";
import { observable } from "bobx";

export class PageOne extends b.Component {
  @observable private _text: string = "";

  render(): b.IBobrilNode {
    return (
      <>
        <input type="text" value={this._text} onChange={newVal => (this._text = newVal)} />
        <button onClick={() => b.runTransition(b.createRedirectPush("two", { text: this._text }))}>
          Confirm
        </button>
      </>
    );
  }
  canDeactivate(): b.IRouteCanResult {
    return !!this._text.trim() || confirm("The textbox is empty. Are you sure?");
  }
}

```

The code in onClick callback of button creates and runs a transition to the page _two_ with an object defining the value of a _text_ parameter.

The transition above should be handled by the `PageTwo` handler.

<!-- # from-file: ../../examples/routing/pages/pageTwo.tsx -->

```tsx
import * as b from "bobril";
import { Link } from "bobril";
import { loggedIn } from "./main";

export interface IPageTwoData extends b.IRouteHandlerData {
  routeParams: { text?: string };
}

export class PageTwo extends b.Component<IPageTwoData> {
  static canActivate(): b.IRouteCanResult {
    if (loggedIn) {
      return true;
    }

    alert("You are not logged in!");
    return b.createRedirectReplace("one");
  }

  render(): b.IBobrilNode {
    return (
      <>
        <p>Your text: {this.data.routeParams.text || "nothing"}</p>
        <Link name="one">
          <a>Go Home</a>
        </Link>
      </>
    );
  }
}

```

The page receives the text parameter value in its `data.routeParams.text`. It also defines a link node to the page _one_ by `<Link name="one">` around `<a>` element.

### Transition Availability

The example also contains codes determining the possibility to enter or leave the page. For these purposes, we can use the following static functions of `IBobrilComponent`:

- `static canActivate` - It can stop the current transition in a target handler by returning false or redirect to the new specified transition
- `canDeactivate` - Can stop the current transition in the a source handler by returning false or redirect to the new specified transition

The previous code also contains example, which handles leaving the page _one_ with empty value of a textbox by adding _canDeactivate_ function and example of handling the not logged user on accessing the page _two_ by adding `static canActivate` function definition.
