import * as b from "bobril";
import * as bs from "bobrilstrap";
import { Todo } from "./todo/todo";

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
          </bs.Container>
        </bs.Navbar>
        <bs.Main>
          <bs.Container style={bs.typography.textCenter}>
            <Todo />
          </bs.Container>
        </bs.Main>
      </bs.Container>
    );
  }
});
