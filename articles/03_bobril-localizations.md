[//]: # (bobrilComIgnoreStart)

# Bobril - Localizations and Formatting

[//]: # (bobrilComIgnoreEnd)

**[Download sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleAppGlobalization)**

[//]: # (bobrilComIgnoreStart)

### Introduction

In this article, we will learn how to localize our application or format a text with culture specifics. The library **bobril-g11n** was created for this purpose.

- [Bobril - I - Getting Started](https://github.com/keeema/bobril-samples/blob/master/articles/01_bobril-getting-started.md)
- [Bobril - II - Bobflux Application Architecture](https://github.com/keeema/bobril-samples/blob/master/articles/02_bobril-bobflux.md)
- [Bobril - III - Localizations and Formatting](https://github.com/keeema/bobril-samples/blob/master/articles/03_bobril-localizations.md)
- [Bobril - IV - Routing](https://github.com/keeema/bobril-samples/blob/master/articles/04_bobril-routing.md)
- [Bobril - V - Bobril-build](https://github.com/keeema/bobril-samples/blob/master/articles/05_bobril-bobril-build.md)
- [Bobril - VI - BobX Application Store Management](https://github.com/keeema/bobril-samples/blob/master/articles/06_bobril-bobx.md)

[//]: # (bobrilComIgnoreEnd)

### Background

Bobril globalization library is written by Boris Letocha (software architect and developer in GMC Software Technology).

It is inspired by Format.js and internally uses Moment.js.

### Examples

At first, we need to have prepared _bobril-build_ on computer. Follow the steps in [first article](https://github.com/keeema/bobril-samples/blob/master/articles/01_bobril-getting-started.md) to perform bobril-build installation.

Now you can start a new project again or use a predefined skeleton simpleApp from [bobril-build github repository](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/Bobris/bobril-build/tree/master/examples/simpleApp).

Following example will use it. To get final code [download the full sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleAppGlobalization).

### Add bobril-g11n to Application

Type to the command line:
``` bash
npm i bobril-g11n --save
bb2
```
Now change the _app.ts_ file and change it to look like this:
``` javascript
import * as b from "bobril";
import { mainPage } from "./mainPage";
import { initGlobalization } from "bobril-g11n";

initGlobalization({ defaultLocale: "en-US" }).then(() => {
  b.routes(b.route({ handler: mainPage }));
});
```
This code will import and call initGlobalization function. Its argument IG11NConfig defines the default locale and optionally the function for getting the path to the localized files. 

Bobril-build is configured to generate the default localization file _en-US.js_ directly to the root of the _dist_ folder.

The initGlobalization function returns a Promise object. Initialization of the application by b.routes has to be called in a fulfillment callback of this promise.

The next step is to import all necessary functions for example by adding the following lines to the _mainPage.ts_ file:
``` javascript
import { t, f, getLocale, setLocale } from "bobril-g11n";
```
Now, we have everything prepared for trying out the examples. You can remove the me.children content in a render function of the page component in _mainPage.ts_ file and use it for trying out the examples.

### Translation

Bobril-globalization package contains a _t_ function with these arguments: 
- message for input text/pattern
- optional params object defining the values for the message pattern
- optional hint
``` javascript
t("Hello World!"); // Hello World!
```
Bobril-build takes all usages of t('some string') in code and replaces it by e.g. t(125) where 125 is the index of 'some string' constant in the array of localized strings. This array is placed in every localization file and corresponds to the array in the generated _en-US.js._

To add a new localization definition just type the command:
``` bash
bb2 t -a cs-CZ
bb2 b -u 1
bb2
```
The first command creates a new translation file _translations/cs-CZ.json._. The second command adds the missing translations from the default generated _en-US.js_ to _cs-CZ.json_ translation definition. The build with the b parameter runs only once and then stops. Finally the last command runs build of the application with tracking changes in the code and with an output to the local web server. The content of the created _json_ can be e.g.:
``` json
[
    "cs-CZ",
    [
        "My name is {a}!",
        null,
        1
    ]
]
```
To add translations it can be modified to the following:
``` json
[
    "cs-CZ",
    [
        "My name is {a}!",
        null,
        1,
        "Jmenuji se {a}!"
    ]
]
```
The specific parts of localization item represented as an array are:

1. Message - "Hello World"
2. Translation help (third optional parameter of t function) - null =not used in t function
3. Indicator of parameters inside of message - 0 = no parameter
4. The translated message - "Ahoj světe"

Parts 1-3 compose the translation key. You can see the json definition example in the attached sample.

If you change the translation definition file, the bobril-build (bb command) has to be stopped and started again or some another change in the code has to be done to rebuild the application.

To see all possible build options use the -h parameter for bb command.

To change the locale, we can use the following code:
``` javascript
setLocale("cs-CZ");
```
This code will change the locale and render the page with specific translations. To get the current locale, we can use a function getLocale.

### Basics

We can simply add placeholders to use variables in our text patterns:
``` javascript
t("My name is {a}!", { a: "Tomas" }); // My name is Tomas!
```
#### Ordinal

To set localized ordinal, use the selectordinal pattern:
``` javascript
t("You are in {floor, selectordinal, =0{ground} one{#st} two{#nd} few{#rd} other{#th}} floor", { floor: 2 });
// you are in 2nd floor
```
The # character is replaced by the floor property in the params object.

#### Plural

The similar plural pattern is used to define localized plurals:
``` javascript
t("here {floor, plural, =0{is no floor} =1{is # floor} other{are # floors}}", { floor: 2 });
// here are 2 floors
```
#### Select

To select a specific value according to some input string, we can use the select pattern:
``` javascript
t("famous {gender, select, female {woman} male {man} other {person}}", { gender: "female" });
// famous woman
```
#### Number

We can use a number pattern to keep numbers in culture specific formatting or to define our own format:
``` javascript
t("{arg, number}", { arg: 1.234 }); // 1.234 in en
t("{arg, number, custom, format:{0.0000}}", { arg: 1.234 }); // 1.2340 - in en
```
#### Date and Time

The date and time patterns work the same way and can be used in the following way:
``` javascript
t("{a, date, lll}", { a: new Date(2000, 0, 2) }); // Jan 2, 2000 12:00 AM - in en
t("{a, date, custom, format:{DD MM}}", { a: new Date(2000, 0, 2) }); // 02 01 - in en
t("{a, date, custom, format:{{myFormat}} }", 
{ a: new Date(2000, 0, 2), myFormat: 'ddd' }); // Sun - in en
```
The specific format definitions can be found in the [Moment.js documentation.](http://momentjs.com/docs/#/displaying/format/)

It can also be defined in a calendar format:
``` javascript
t("{a, time, calendar}", { a: Date.now() + 24 * 60 * 60 * 1000 }); // Tomorrow at 4:27 PM - in en
```
or as a relative from now:
``` javascript
t("{a, time, relative}", { a: Date.now() - 100000 }); // 2 minutes ago - in en
```
For more examples [download the full sample](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/keeema/bobril-samples/tree/master/sampleAppGlobalization).

#### Just Formatting

If you only want to do the formatting of a text without a translation, just replace the t function by the f function. 

It will only take care of culture specific formatting.
