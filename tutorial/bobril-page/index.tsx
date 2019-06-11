import * as b from "bobril";
import "bobrilstrap";
import * as routes from "./routes";
import "./node_modules/prismjs/plugins/toolbar/prism-toolbar";
import "./node_modules/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "./node_modules/prismjs/components/prism-bash";
import "./node_modules/prismjs/components/prism-jsx";
import "./node_modules/prismjs/themes/prism-tomorrow.css";

b.asset("node_modules/bootswatch/sandstone/bootstrap.min.css");

b.routes(
  b.route(routes.main, [
    b.route(routes.gettingStarted),
    b.route(routes.ecoSystem),
    b.routeDefault(routes.gettingStarted)
  ])
);
