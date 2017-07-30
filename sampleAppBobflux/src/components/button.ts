import * as b from 'bobril';

interface IButtonData {
    title: string;
    onClick: () => void;
}

interface ICtx extends b.IBobrilCtx {
    data: IButtonData;
}

export const button = b.createComponent<IButtonData>({
    render(ctx: ICtx, me: b.IBobrilNode): void {
        me.tag = 'button';
        me.attrs = { type: 'button' };
        me.children = ctx.data.title;
    },
    onClick(ctx: ICtx, ev: b.IBobrilMouseEvent): boolean {
        ctx.data.onClick();
        return true;
    }
});

export default button;