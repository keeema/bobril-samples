import * as b from 'bobril';

export interface IHeaderData {
    children?: b.IBobrilNode;
}

interface IHeaderCtx extends b.IBobrilCtx {
    data: IHeaderData;
}

export const h1 = b.createComponent<IHeaderData>({
    render(ctx: IHeaderCtx, me: b.IBobrilNode) {
        me.tag = 'h1';
        me.children = ctx.data.children;
    }
});