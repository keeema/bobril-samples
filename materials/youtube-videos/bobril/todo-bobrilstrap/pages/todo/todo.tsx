import * as b from "bobril";
import { todoStore } from "./store";
import { Form } from "./form";
import { List } from "./list";

export const Todo = b.createVirtualComponent({
  id: "todo",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <h1>TODO</h1>
        <Form />
        <List />
      </div>
    );
  }
});
