import * as b from "bobril";
import * as bs from "bobrilstrap";
import { todoStore } from "./store";

export const Form = b.createVirtualComponent({
  id: "form",
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
                disabled={todoStore.isValueEmpty}
                option={bs.ButtonOption.Success}
              />
            </bs.InputGroupBtn>
          </bs.InputGroup>
        </bs.Col>
      </bs.Row>
    );
  }
});
