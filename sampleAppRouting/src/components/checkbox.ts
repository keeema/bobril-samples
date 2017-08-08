import * as b from 'bobril';

interface IData {
    title: string;
    value?: boolean;
    onChange: (value: boolean) => void;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export const checkbox = b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode): void {
        me.tag = 'div';
        me.children = [
            {
                tag: 'input',
                attrs: { type: 'checkbox', value: !!ctx.data.value },
                component: {
                    onChange(_innerCtx: b.IBobrilCtx, value: boolean) {
                        ctx.data.onChange(value);
                        return true;
                    }
                }
            },
            ctx.data.title
        ];
    }
});
