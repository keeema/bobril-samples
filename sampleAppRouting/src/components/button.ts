import * as b from "bobril";

interface IData {
  title: string;
  onClick: () => void;
}

interface ICtx extends b.IBobrilCtx {
  data: IData;
}

export const button = b.createComponent<IData>({
  render(ctx: ICtx, me: b.IBobrilNode): void {
    me.tag = "button";
    me.attrs = { type: "button" };
    me.children = ctx.data.title;
  },
  onClick(ctx: ICtx): boolean {
    ctx.data.onClick();
    return true;
  }
});
