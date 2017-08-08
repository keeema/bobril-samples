import * as b from 'bobril';
import { mainPage } from './page';
import { pageOne } from './pages/pageOne';
import { pageTwo } from './pages/pageTwo';

b.routes(
    b.route({ handler: mainPage }, [
        b.route({ url: '/one', name: 'one', handler: pageOne }),
        b.route({ url: '/two/:text?', name: 'two', handler: pageTwo }),
        b.routeDefault({ handler: pageOne })
    ])
);
