import * as b from 'bobril';
import { t, f, getLocale, setLocale } from 'bobril-g11n';
import { tag } from './helper';

function change() {
    setLocale(getLocale() === 'en-US' ? 'cs-CZ' : 'en-US');
    b.invalidate();
    return true;
}

export const mainPage = b.createComponent({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
        me.children = [
            tag('h1', t('Localization')),
            tag('button', t('Change'), { onClick: change }),
            tag('h2', t('Basics')),
            tag('p', t('Hello World!')),
            tag('p', t('My name is {a}!', { a: 'Tomas' })),

            tag('h2', t('Ordinal')),
            tag('p', t('you are in {floor, selectordinal, =0{ground} one{#st} two{#nd} few{#rd} other{#th}} floor', { floor: 0 })),
            tag('p', t('you are in {floor, selectordinal, =0{ground} one{#st} two{#nd} few{#rd} other{#th}} floor', { floor: 1 })),
            tag('p', t('you are in {floor, selectordinal, =0{ground} one{#st} two{#nd} few{#rd} other{#th}} floor', { floor: 2 })),
            tag('p', t('you are in {floor, selectordinal, =0{ground} one{#st} two{#nd} few{#rd} other{#th}} floor', { floor: 3 })),
            tag('p', t('you are in {floor, selectordinal, =0{ground} one{#st} two{#nd} few{#rd} other{#th}} floor', { floor: 4 })),

            tag('h2', t('Plural')),
            tag('p', t('here {floor, plural, =0{is no floor} =1{is # floor} other{are # floors}}', { floor: 0 })),
            tag('p', t('here {floor, plural, =0{is no floor} =1{is # floor} other{are # floors}}', { floor: 1 })),
            tag('p', t('here {floor, plural, =0{is no floor} =1{is # floor} other{are # floors}}', { floor: 2 })),

            tag('h2', t('Select')),
            tag('p', t('famous {gender, select, female {woman} male {man} other {person}}', { gender: 'female' })),
            tag('p', t('famous {gender, select, female {woman} male {man} other {person}}', { gender: 'male' })),
            tag('p', t('famous {gender, select, female {woman} male {man} other {person}}', { gender: 'person' })),

            tag('h2', t('Formating')),
            tag('p', f('{arg, number}', { arg: 1.234 })),
            tag('p', f('{a, time, relative}', { a: Date.now() + 100000 })),

            tag('h2', t('Number')),
            tag('p', f('{arg, number}', { arg: 0 })),
            tag('p', f('{arg, number}', { arg: 1000 })),
            tag('p', f('{arg, number}', { arg: 1.234 })),
            tag('p', f('{arg, number, custom, format:{0.0000}}', { arg: 1.234 })),
            tag('p', f('{arg, number, custom, format:{{myFormat}}}', { arg: 1.234, myFormat: '0.00000' })),
            tag('p', f('{arg, number, percent}', { arg: 0.23 })),

            tag('h2', t('Date & Time')),
            tag('p', f('{a, date, dddd}', { a: new Date(2000, 0, 2) })),
            tag('p', f('{a, date, lll}', { a: new Date(2000, 0, 2) })),
            tag('p', f('{a, date, LLLL}', { a: new Date(2000, 0, 2) })),
            tag('p', f('{a, date, custom, format:{DD MM}}', { a: new Date(2000, 0, 2) })),
            tag('p', f('{a, date, custom, format:{{myformat}} }', { a: new Date(2000, 0, 2), myformat: 'ddd' })),

            tag('h2', t('Calendar')),
            tag('p', f('{a, time, calendar}', { a: Date.now() + 24 * 60 * 60 * 1000 })),
            tag('p', f('{a, time, calendar}', { a: Date.now() + 2 * 24 * 60 * 60 * 1000 })),
            tag('p', f('{a, time, calendar}', { a: Date.now() + 7 * 24 * 60 * 60 * 1000 })),

            tag('h2', t('Relative')),
            tag('p', f('{a, time, relative}', { a: Date.now() - 1000 })),
            tag('p', f('{a, time, relative}', { a: Date.now() - 100000 })),
            tag('p', f('{a, time, relative}', { a: Date.now() + 10000000 })),
            tag('p', f('{a, time, relative, noago}', { a: Date.now() + 100000 }))
        ];
    }
});

export default mainPage;
