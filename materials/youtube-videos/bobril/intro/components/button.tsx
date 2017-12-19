import * as b from "bobril";

const redButton = b.styleDef({ color: "red" });

export interface IButtonData {
  title: string;
  onClick: () => void;
}

interface IButtonCtx extends b.IBobrilCtx {
  data: IButtonData;
}

export const Button = b.createVirtualComponent<IButtonData>({
  id: "button",
  render(ctx: IButtonCtx, me: b.IBobrilNode) {
    me.tag = "button";
    b.style(me, redButton);
    me.children = ctx.data.title;
  },
  onClick(ctx: IButtonCtx) {
    ctx.data.onClick();
    return true;
  }
});

export default Button;
