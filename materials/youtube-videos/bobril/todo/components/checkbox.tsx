import * as b from "bobril";

export interface ICheckboxData {
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

interface ICheckboxCtx extends b.IBobrilCtx {
  data: ICheckboxData;
}

export const Checkbox = b.createVirtualComponent<ICheckboxData>({
  id: "checkbox",
  render(ctx: ICheckboxCtx, me: b.IBobrilNode) {
    me.tag = "input";
    me.attrs = { type: "checkbox", value: ctx.data.checked };
  },
  onChange(ctx: ICheckboxCtx, value: boolean) {
    ctx.data.onChange(value);
  }
});
