import * as b from "bobril";
import * as bs from "bobrilstrap";
import Button from "../components/button";
import { Todo } from "./todo/todo";

export const Main = b.createVirtualComponent({
  id: "main",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <bs.Container style={bs.typography.textCenter}>
        <bs.Navbar>
          <bs.Container fluid={true}>
            <bs.NavbarHeader>
              <bs.NavbarBrand>Bobril</bs.NavbarBrand>
            </bs.NavbarHeader>
          </bs.Container>
        </bs.Navbar>
        <Todo />
      </bs.Container>
    );
  }
});

export default Main;
