import * as b from "bobril";

export function childrenAsArray(
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

export function getId(node: b.IBobrilNode): string | undefined {
  return node.attrs ? node.attrs.id : undefined;
}
