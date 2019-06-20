import * as b from "bobril";

export class Content extends b.Component {
  static id: string = "eco-system";
  render(): b.IBobrilChildren {
    return content;
  }
}

export const content: b.IBobrilNode = <><h1 id="eco-system">{`Eco-system`}</h1>
<p>{`Bobril is an opinionated framework distributed with portfolio of supporting packages.`}</p>
<h2 id="bobril-build">{`Bobril-build`}</h2>
<p><a href="https://badge.fury.io/js/bobril-build"><img src="https://badge.fury.io/js/bobril-build.svg" alt="npm version"/></a></p>
<p>{`Helper tool to build Bobril applications Mainly it will support copying sprites, building big sprites. support i18n. All this during optimal TypeScript compilation. `}<a href="https://github.com/Bobris/bobril-build">{`GitHub`}</a></p>
<h2 id="bobril-g11n">{`Bobril-G11N`}</h2>
<p><a href="https://badge.fury.io/js/bobril-g11n"><img src="https://badge.fury.io/js/bobril-g11n.svg" alt="npm version"/></a></p>
<p>{`Bobril Globalization extension. `}<a href="https://github.com/Bobris/bobril-g11n">{`GitHub`}</a></p>
<h2 id="bobx">{`BobX`}</h2>
<p><a href="https://badge.fury.io/js/bobx"><img src="https://badge.fury.io/js/bobx.svg" alt="npm version"/></a></p>
<p>{`MobX like library for Bobril. `}<a href="https://github.com/bobril/bobx">{`GitHub`}</a></p>
<h2 id="bobflux">{`Bobflux`}</h2>
<p><a href="https://badge.fury.io/js/bobflux"><img src="https://badge.fury.io/js/bobflux.svg" alt="npm version"/></a></p>
<p>{`Bobflux is pure functional implementation of FLUX architecture. `}<a href="https://github.com/karelsteinmetz/bobflux">{`GitHub`}</a></p>
<h2 id="bobrilstrap">{`Bobrilstrap`}</h2>
<p><a href="https://badge.fury.io/js/bobrilstrap"><img src="https://badge.fury.io/js/bobrilstrap.svg" alt="npm version"/></a></p>
<p>{`Bobril wrapper of the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web - Bootstrap. `}<a href="http://bobrilstrap.com">{`Project pages`}</a>{` | `}<a href="https://github.com/keeema/bobrilstrap">{`GitHub`}</a></p>
<h2 id="bobril-m">{`Bobril-M`}</h2>
<p><a href="https://badge.fury.io/js/bobril-m"><img src="https://badge.fury.io/js/bobril-m.svg" alt="npm version"/></a></p>
<p>{`Bobril Material UIs. `}<a href="https://github.com/bobril/bobril-m">{`GitHub`}</a></p>
</>;