import * as b from "bobril";

export class Content extends b.Component {
  static id: string = "--ID--";
  render(): b.IBobrilChildren {
    return content;
  }
}

export const content: b.IBobrilNode = <>--CONTENT--</>;