import * as b from "bobril";
import { observable } from "bobx";
import { Navigation } from "./navigation/navigation";
import * as prismJs from "prismjs";
import "bobrilstrap";

export class Main extends b.Component<b.IRouteHandlerData> {
  @observable collapsedMenu: boolean = true;

  render(): b.IBobrilChildren {
    return (
      <>
        <Navigation />
        {this.data.activeRouteHandler()}
      </>
    );
  }

  postInitDom(): void {
    prismJs.highlightAll();
  }

  postUpdateDom(): void {
    prismJs.highlightAll();
  }
}
