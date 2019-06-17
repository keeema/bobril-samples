import * as b from "bobril";

export class Content extends b.Component {
  static id: string = "--ID--";
  render(): b.IBobrilChildren {
    return <>--CONTENT--</>;
  }

  // postRenderDom(): void {
  //   const elem = b.getDomNode(this.me) as HTMLDivElement;
  //   elem.innerHTML = content;
  // }
}

// const content = [--CONTENT--];
