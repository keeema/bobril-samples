import * as b from 'bobril';
import * as flux from 'bobflux';
import * as monitor from 'bobflux-monitor';
import * as todoState from './state';
import { mainPage } from './mainPage';

flux.bootstrap(todoState.createDefaultTodoAppState(), { debugCallback: monitor.init() });

b.routes(
    b.route({ handler: mainPage })
);
