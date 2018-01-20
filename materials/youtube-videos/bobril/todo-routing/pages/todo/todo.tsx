import * as b from "bobril";
import { todoStore } from "./store";
import { Form } from "./form";
import { List } from "./list";

interface ITodoData {
  routeParams: { item?: string };
}

interface ITodoCtx extends b.IBobrilCtx {
  data: ITodoData;
}

export const Todo = b.createVirtualComponent<ITodoData>({
  id: "todo",
  init(ctx: ITodoCtx) {
    if (ctx.data.routeParams.item !== undefined) {
      todoStore.currentValue = ctx.data.routeParams.item;
      todoStore.add();
    }
  },
  render(ctx: ITodoCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <h1>TODO</h1>
        <Form />
        <List />
      </div>
    );
  }
});
