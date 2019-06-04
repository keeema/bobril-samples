import * as b from "bobril";

export interface ILayoutData {
  children: {
    header: b.IBobrilChildren;
    body: b.IBobrilChildren;
    footer: b.IBobrilChildren;
  };
}

export function Layout(data: ILayoutData): b.IBobrilNode {
  return (
    <>
      <div>{data.children.header}</div>
      <div>{data.children.body}</div>
      <div>{data.children.footer}</div>
    </>
  );
}
