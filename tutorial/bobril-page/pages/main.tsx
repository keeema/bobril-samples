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

  postRenderDom(): void {
    prismJs.highlightAll();
    this.fixAnchors();
  }

  private fixAnchors(): void {
    const anchors = document.getElementsByTagName("a");
    for (let i = 0; i < anchors.length; i++) {
      if (!anchors[i].href) {
        anchors[i].href = "javascript:void(0);";
      }
    }
  }
}
