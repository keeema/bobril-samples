import * as b from "bobril";

interface IData {
  value: string;
  onChange: (newValue: string) => void;
}

interface ICtx extends b.IBobrilCtx {
  data: IData;
}

export const textbox = b.createComponent<IData>({
  render(ctx: ICtx, me: b.IBobrilNode): void {
    me.tag = "input";
    me.attrs = { type: "text", value: ctx.data.value };
  },
  onChange(ctx: ICtx, newValue: string): void {
    ctx.data.onChange(newValue);
  }
});
