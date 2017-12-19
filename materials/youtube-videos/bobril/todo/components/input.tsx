import * as b from "bobril";

export interface IInputTextData {
  value: string;
  onChange: (newValue: string) => void;
}

interface IInputTextCtx extends b.IBobrilCtx {
  data: IInputTextData;
}

export const InputText = b.createVirtualComponent<IInputTextData>({
  id: "input-text",
  render(ctx: IInputTextCtx, me: b.IBobrilNode) {
    me.tag = "input";
    me.attrs = { type: "text", value: ctx.data.value };
  },
  onChange(ctx: IInputTextCtx, newValue: string) {
    ctx.data.onChange(newValue);
  }
});

export default InputText;
