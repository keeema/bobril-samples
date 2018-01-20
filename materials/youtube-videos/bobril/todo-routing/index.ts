import * as b from "bobril";
import * as bs from "bobrilstrap";
import * as routes from "./routes";
import { Main } from "./pages/main";

bs.init();
b.routes(
  b.route(routes.main, [
    b.route(routes.todo),
    b.route(routes.about),
    b.routeDefault(routes.defaultRoute)
  ])
);
