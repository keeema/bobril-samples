import * as b from "bobril";
import { Container, Jumbotron, Size, Col } from "bobrilstrap";
import { Header } from "./header";
import { ShortInfo } from "./shortInfo";
import { Content, content } from "./content";
import { SideBar } from "../sidebar/sidebar";
import { buildPageRoute } from "../generateUtils/routebuilder";

export const pageInfo = buildPageRoute(
  {
    name: "getting-started",
    url: "getting-started",
    handler: () => <GettingStarted />
  },
  content
);

export class GettingStarted extends b.Component<{}> {
  render(): b.IBobrilChildren {
    return (
      <>
        <Jumbotron style={[closeToNavBar]}>
          <Container>
            <Header large />
            <Header />
            <ShortInfo />
          </Container>
        </Jumbotron>

        <Container>
          <Col size={Size.Sm} span={9}>
            <Content />
          </Col>
          <Col size={Size.Sm} span={3}>
            <SideBar
              items={pageInfo.item.subs!}
              topTargetId={pageInfo.route.name + "-top"}
              main
            />
          </Col>
        </Container>
      </>
    );
  }
}

const closeToNavBar = { marginTop: -21 };
