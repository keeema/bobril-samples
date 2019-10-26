import * as b from "bobril";
import { Main } from "./pages/main";
import { pageInfo as getStartedPageInfo } from "./pages/getStarted/getStarted";
import { pageInfo as moreTutorialsPageInfo } from "./pages/moreTutorials/moreTutorials";
import { EcoSystem } from "./pages/ecoSystem/ecoSystem";

export const main: b.IRoute = { handler: data => <Main {...data} /> };

export const gettingStarted: b.IRoute = getStartedPageInfo.route;

export const moreTutorials: b.IRoute = moreTutorialsPageInfo.route;

export const ecoSystem: b.IRoute = {
  name: "eco-system",
  url: "eco-system",
  handler: () => <EcoSystem />
};

export const defaultRoute = gettingStarted;
