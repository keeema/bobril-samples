import * as b from "bobril";
import { Button } from "../../components/button";
import { todoStore } from "./store";
import { Checkbox } from "../../components/checkbox";

const listItemStyle = b.styleDef({
  marginLeft: 10,
  marginRight: 10,
  width: 150,
  display: "inline-block"
});

const completedItemStyle = b.styleDef({ textDecoration: "line-through" });

export const List = b.createVirtualComponent({
  id: "todo-list",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <div>
        {todoStore.items.map((item, index) => (
          <p>
            <Checkbox
              checked={item.completed}
              onChange={completed => todoStore.setCompleted(index, completed)}
            />
            <div style={[listItemStyle, item.completed && completedItemStyle]}>
              {item.title}
            </div>
            <Button title="REMOVE" onClick={() => todoStore.remove(index)} />
          </p>
        ))}
      </div>
    );
  }
});
