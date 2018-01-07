import * as b from "bobril";
import * as bs from "bobrilstrap";
import { Textbox } from "../../components/textbox";
import { Button } from "../../components/button";
import { todoStore } from "./store";

export const Form = b.createVirtualComponent({
  id: "todo-form",
  render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
    me.children = (
      <bs.Row>
        <bs.Col span={12} size={bs.Size.Lg}>
          <bs.InputGroup>
            <bs.InputText
              value={todoStore.currentValue}
              onChange={newValue => (todoStore.currentValue = newValue)}
            />
            <bs.InputGroupBtn>
              <bs.Button
                label="ADD"
                onClick={() => todoStore.add()}
                option={bs.ButtonOption.Success}
                disabled={todoStore.isValueEmpty}
              />
            </bs.InputGroupBtn>
          </bs.InputGroup>
        </bs.Col>
      </bs.Row>
    );
  }
});
