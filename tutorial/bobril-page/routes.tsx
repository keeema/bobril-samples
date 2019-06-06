import * as b from "bobril";
import { Main } from "./pages/main";
import { GettingStarted } from "./pages/getStarted/getStarted";
import { EcoSystem } from "./pages/ecoSystem/ecoSystem";

export const main: b.IRoute = { handler: data => <Main {...data} /> };

export const gettingStarted: b.IRoute = {
  name: "getting-started",
  url: "getting-started",
  handler: () => <GettingStarted />
};

export const ecoSystem: b.IRoute = {
  name: "eco-system",
  url: "eco-system",
  handler: () => <EcoSystem />
};
