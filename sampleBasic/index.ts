import * as b from 'bobril';
import { button } from './button';

let counter = 0;

b.init(() => {
    setTimeout(() => { counter++; b.invalidate(); }, 1000);

    return [
        { tag: 'h1', children: 'Hello World!' },
        button({ title: 'Click Me!', onClick: () => alert('Yeah! I was clicked!') }),
        { tag: 'p', children: counter.toString() }
    ];
});