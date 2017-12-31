import * as b from "bobril";
import { Textbox } from "../../components/textbox";
import { Button } from "../../components/button";
import { todoStore } from "./store";

export const Form = b.createVirtualComponent({
  id: "todo-form",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <Textbox
          value={todoStore.currentValue}
          onChange={newValue => (todoStore.currentValue = newValue)}
        />
        <Button title="ADD" onClick={() => todoStore.add()} />
      </div>
    );
  }
});
