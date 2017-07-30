import * as b from 'bobril';

export interface IButtonData {
    title: string;
    onClick?: () => void;
}

interface IButtonCtx extends b.IBobrilCtx {
    data: IButtonData;
}

export const button = b.createComponent<IButtonData>({
    render(ctx: IButtonCtx, me: b.IBobrilNode) {
        me.tag = 'button';
        me.children = ctx.data.title;
    },
    onClick(ctx: IButtonCtx): boolean {
        if (ctx.data.onClick) {
            ctx.data.onClick();
        }

        return true;
    }
});

export default button;