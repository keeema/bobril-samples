import * as b from "bobril";
import { todoStore } from "./store";
import { Form } from "./form";
import { List } from "./list";

export const Todo = b.createVirtualComponent({
  id: "todo",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <h2>TODO</h2>
        <Form />
        <List />
      </div>
    );
  }
});
