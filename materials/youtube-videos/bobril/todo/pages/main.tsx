import * as b from "bobril";
import Button from "../components/button";
import { Todo } from "./todo/todo";

export const Main = b.createVirtualComponent({
  id: "main",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <h1>Bobril</h1>
        <Todo />
      </div>
    );
  }
});

export default Main;
