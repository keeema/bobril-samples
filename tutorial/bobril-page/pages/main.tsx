import * as b from "bobril";
import { observable } from "bobx";
import { Navigation } from "./navigation/navigation";

export class Main extends b.Component<b.IRouteHandlarData> {
  @observable collapsedMenu: boolean = true;

  render(): b.IBobrilChildren {
    return (
      <>
        <Navigation />
        {this.data.activeRouteHandler()}
      </>
    );
  }
}
