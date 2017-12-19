import * as b from "bobril";
import { InputText } from "../../components/input";
import { Button } from "../../components/button";
import { todoStore } from "./store";

export const Todo = b.createVirtualComponent({
  id: "todo",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        <h2>TODO</h2>
        <InputText
          value={todoStore.currentValue}
          onChange={newValue => (todoStore.currentValue = newValue)}
        />
        <Button title="ADD" onClick={() => todoStore.add()} />
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
