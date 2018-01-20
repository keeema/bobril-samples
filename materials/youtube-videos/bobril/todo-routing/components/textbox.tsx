import * as b from "bobril";

export interface ITextboxData {
  value: string;
  onChange: (newValue: string) => void;
}

interface ITextboxCtx extends b.IBobrilCtx {
  data: ITextboxData;
}

export const Textbox = b.createVirtualComponent<ITextboxData>({
  id: "textbox",
  render(ctx: ITextboxCtx, me: b.IBobrilNode) {
    me.tag = "input";
    me.attrs = { type: "text", value: ctx.data.value };
  },
  onChange(ctx: ITextboxCtx, newValue: string) {
    ctx.data.onChange(newValue);
  }
});

export default Textbox;
