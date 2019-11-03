import * as b from "bobril";
import { PageOne } from "./pages/pageOne";
import { PageTwo } from "./pages/pageTwo";
import { MainPage } from "./pages/main";

b.routes(
  b.route({ handler: data => <MainPage {...data} /> }, [
    b.route({ url: "/one", name: "one", handler: data => <PageOne {...data} /> }),
    b.route({ url: "/two/:text?", name: "two", handler: data => <PageTwo {...data} /> }),
    b.routeDefault({ handler: data => <PageOne {...data} /> })
  ])
);
