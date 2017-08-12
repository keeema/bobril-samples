import * as b from 'bobril';

export interface IParagraphData {
    children?: b.IBobrilNode;
}

interface IParagraphCtx extends b.IBobrilCtx {
    data: IParagraphData;
}

export const p = b.createComponent<IParagraphData>({
    render(ctx: IParagraphCtx, me: b.IBobrilNode) {
        me.tag = 'p';
        me.children = ctx.data.children;
    }
});

export default p;