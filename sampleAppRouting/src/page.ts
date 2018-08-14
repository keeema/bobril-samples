import * as b from "bobril";
import { tag } from "./helper";
import { checkbox } from "./components/checkbox";

export let loggedIn = false;

export const mainPage = b.createComponent({
  render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
    me.children = [
      tag("h1", "Routing example"),
      tag(
        "p",
        checkbox({
          title: "Logged in",
          value: loggedIn,
          onChange: value => {
            loggedIn = value;
          }
        })
      ),
      tag("hr"),
      tag("div", me.data.activeRouteHandler())
    ];
  }
});
