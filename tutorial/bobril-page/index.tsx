import * as b from "bobril";
import * as bs from "bobrilstrap";
import * as routes from "./routes";

bs.init();

b.asset("node_modules/bootswatch/superhero/bootstrap.min.css");

b.routes(
  b.route(routes.main, [
    b.route(routes.gettingStarted),
    b.route(routes.ecoSystem),
    b.routeDefault(routes.gettingStarted)
  ])
);
