import * as b from "bobril";
import * as bs from "bobrilstrap";
import { Button } from "../../components/button";
import { todoStore } from "./store";
import { Checkbox } from "../../components/checkbox";

const completedItemStyle = b.styleDef({ textDecoration: "line-through" });

export const List = b.createVirtualComponent({
  id: "todo-list",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <bs.Table>
        <bs.TBody>
          {todoStore.items.map((item, index) => (
            <bs.Tr>
              <bs.Td style={bs.typography.textLeft}>
                <bs.InputCheckbox
                  children={item.completed}
                  onChange={completed =>
                    todoStore.setCompleted(index, completed)
                  }
                />
              </bs.Td>
              <bs.Td style={item.completed && completedItemStyle}>
                {item.title}
              </bs.Td>
              <bs.Td style={bs.typography.textRight}>
                <bs.Button
                  label="REMOVE"
                  onClick={() => todoStore.remove(index)}
                />
              </bs.Td>
            </bs.Tr>
          ))}
        </bs.TBody>
      </bs.Table>
    );
  }
});
