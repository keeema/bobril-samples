import * as b from 'bobril';
import { tag } from '../helper';
import { loggedIn } from '../page';

export interface IData {
    routeParams: { text?: string };
}

export interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export const pageTwo = b.createComponent<IData>({
    canActivate() {
        if (loggedIn)
            return true;
        alert('You are not logged in!');
        return b.createRedirectReplace('one');
    },
    render(ctx: ICtx, me: b.IBobrilNode): void {
        const value = (ctx.data.routeParams.text || '').trim();
        me.children = [
            tag('p', 'Your text: ' + (!!value ? value : 'nothing')),
            b.link(tag('a', 'Go Home'), 'one')
        ];
    }
});
