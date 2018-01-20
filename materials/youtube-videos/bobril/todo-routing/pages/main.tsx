import * as b from "bobril";
import * as bs from "bobrilstrap";
import * as routes from "../routes";

export const Main = b.createVirtualComponent({
  id: "main",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <bs.Container>
        <bs.Navbar>
          <bs.Container>
            <bs.NavbarHeader>
              <bs.NavbarBrand>Bobril</bs.NavbarBrand>
            </bs.NavbarHeader>
            <bs.NavbarNav>
              <bs.NavbarNavItem active={b.isActive(routes.todo.name)}>
                {b.link(<a>Todo</a>, routes.todo.name)}
              </bs.NavbarNavItem>
              <bs.NavbarNavItem active={b.isActive(routes.about.name)}>
                {b.link(<a>About</a>, routes.about.name)}
              </bs.NavbarNavItem>
            </bs.NavbarNav>
          </bs.Container>
        </bs.Navbar>
        <bs.Main>
          <bs.Container style={bs.typography.textCenter}>
            {me.data.activeRouteHandler()}
          </bs.Container>
        </bs.Main>
      </bs.Container>
    );
  }
});
