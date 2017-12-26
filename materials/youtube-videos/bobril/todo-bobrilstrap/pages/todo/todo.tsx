import * as b from "bobril";
import { InputText } from "../../components/input";
import { Button } from "../../components/button";
import { todoStore } from "./store";
import { Form } from "./form";

export const Todo = b.createVirtualComponent({
  id: "todo",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <h2>TODO</h2>
        <Form />
        {todoStore.items.map((item, index) => (
          <p>
            <span>{item}</span>
            <Button title="REMOVE" onClick={() => todoStore.remove(index)} />
          </p>
        ))}
      </div>
    );
  }
});
