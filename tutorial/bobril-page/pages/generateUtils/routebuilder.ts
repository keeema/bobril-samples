import * as b from "bobril";
import { IItemData } from "../sidebar/sidebarItem";
import { childrenAsArray, getId } from "./bobrilHelper";

interface IRouteWithLevel {
  route: b.IRoute;
  level: number;
  parent?: IRouteWithLevel;
  item: IItemData;
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

function buildSubRoutes(
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
