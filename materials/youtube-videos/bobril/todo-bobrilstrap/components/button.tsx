import * as b from "bobril";

export interface IButtonData {
  title: string;
  onClick: () => void;
  bold?: boolean;
}

interface IButtonCtx extends b.IBobrilCtx {
  data: IButtonData;
}

export const bold = b.styleDef({ fontWeight: "bold" });

export const Button = b.createVirtualComponent<IButtonData>({
  id: "button",
  render(ctx: IButtonCtx, me: b.IBobrilNode) {
    me.tag = "button";
    b.style(me, ctx.data.bold && bold);
    me.children = ctx.data.title;
  },
  onClick(ctx: IButtonCtx): boolean {
    ctx.data.onClick();
    return true;
  }
});
