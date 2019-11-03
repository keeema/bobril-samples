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
