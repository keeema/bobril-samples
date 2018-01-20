import * as b from "bobril";
import * as bs from "bobrilstrap";
import * as routes from "../../routes";

export const About = b.createVirtualComponent({
  id: "about",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <h1>About</h1>
        <p>Some nice about page.</p>
        <bs.Button
          label="HOME"
          onClick={() =>
            b.runTransition(b.createRedirectPush(routes.defaultRoute.name))
          }
        />
      </div>
    );
  }
});
