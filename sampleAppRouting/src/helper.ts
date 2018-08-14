import * as b from "bobril";

export function tag(
  tagName: string,
  content?: b.IBobrilChildren,
  component?: b.IBobrilComponent
): b.IBobrilNode {
  return { tag: tagName, children: content, component: component };
}
