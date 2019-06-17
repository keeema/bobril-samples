import * as b from "bobril";
import { Main } from "./pages/main";
import { GettingStarted } from "./pages/getStarted/getStarted";
import { EcoSystem } from "./pages/ecoSystem/ecoSystem";
import { MoreTutorials } from "./pages/moreTutorials/moreTutorials";

export const main: b.IRoute = { handler: data => <Main {...data} /> };

export const gettingStarted: b.IRoute = {
  name: "getting-started",
  url: "getting-started",
  handler: () => <GettingStarted />
};

export const moreTutorials: b.IRoute = {
  name: "more-tutorials",
  url: "more-tutorials",
  handler: () => <MoreTutorials />
};

export const ecoSystem: b.IRoute = {
  name: "eco-system",
  url: "eco-system",
  handler: () => <EcoSystem />
};
