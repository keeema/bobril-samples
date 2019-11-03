import * as b from "bobril";
import { Link } from "bobril";
import { loggedIn } from "./main";

export interface IPageTwoData extends b.IRouteHandlerData {
  routeParams: { text?: string };
}

export class PageTwo extends b.Component<IPageTwoData> {
  static canActivate(): b.IRouteCanResult {
    if (loggedIn) {
      return true;
    }

    alert("You are not logged in!");
    return b.createRedirectReplace("one");
  }

  render(): b.IBobrilNode {
    return (
      <>
        <p>Your text: {this.data.routeParams.text || "nothing"}</p>
        <Link name="one">
          <a>Go Home</a>
        </Link>
      </>
    );
  }
}
