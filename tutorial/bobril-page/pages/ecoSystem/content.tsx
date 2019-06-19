import * as b from "bobril";
import { IItemData } from "../sidebar/sidebarItem";

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

interface IRouteWithLevel {
  route: b.IRoute;
  level: number;
  parent?: IRouteWithLevel;
  item: IItemData;
}

export function buildSubRoutes(
  node: b.IBobrilNode,
  lastRoute: IRouteWithLevel
): IRouteWithLevel {
  childrenAsArray(
    node.children || (node.data ? node.data.children : undefined)
  ).forEach(child => {
    let foundLevel = 0;
    const id = getId(child);
    if (child.tag && id) {
      const result = /(h)([1-6]){1}/.exec(child.tag);
      if (result && result.length > 2) {
        foundLevel = parseInt(result[2], 10);
      }
    }

    if (foundLevel <= 1) {
      lastRoute = buildSubRoutes(child, lastRoute);
    } else {
      const newRoute = b.route({ name: id, url: id }, []);

      const childWithAnchor = b.anchor(child, id);
      child.component = childWithAnchor.component;

      if (foundLevel <= lastRoute.level) {
        do {
          lastRoute = lastRoute.parent!;
        } while (lastRoute.level >= foundLevel);
      }

      lastRoute.route.children
        ? lastRoute.route.children.push(newRoute)
        : (lastRoute.route.children = [newRoute]);

      const item: IItemData = {
        subs: [],
        title: child.children as string,
        targetId: id!
      };
      lastRoute.item.subs!.push(item);
      lastRoute = {
        route: newRoute,
        level: foundLevel,
        parent: lastRoute,
        item
      };
    }
  });

  return lastRoute;
}

function childrenAsArray(
  children: b.IBobrilChildren | undefined
): b.IBobrilNode[] {
  let result: b.IBobrilNode[] = [];
  if (children !== undefined) {
    if (b.isArray(children)) {
      (children as b.IBobrilChildren[]).forEach(
        child => (result = [...result, ...childrenAsArray(child)])
      );
    } else {
      result.push(children as b.IBobrilNode);
    }
  }
  return result;
}

function getId(node: b.IBobrilNode): string | undefined {
  return node.attrs ? node.attrs.id : undefined;
}

export interface IRouteWithItems {
  route: b.IRoute;
  item: IItemData;
}

export function buildPageRoute(
  routeDef: b.IRoute,
  routeContent: b.IBobrilNode
): IRouteWithItems {
  const route = b.route(routeDef, [
    b.route({ url: routeDef.url + "-top", name: routeDef.name + "-top" })
  ]);
  const item: IItemData = { subs: [], targetId: "", title: "" };

  buildSubRoutes(routeContent, {
    route,
    level: 0,
    item
  });

  console.log(route.children);
  return { route, item: item };
}
