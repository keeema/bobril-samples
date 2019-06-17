import * as b from "bobril";
import { Container, Jumbotron, Size, Col } from "bobrilstrap";
import { Header } from "./header";
import { ShortInfo } from "./shortInfo";
import { Content } from "./content";

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
          <Col size={Size.Sm} span={12}>
            <Content />
          </Col>
          {/* <Col size={Size.Sm} span={9}>
            <SideBar
              items={[{ targetId: "test", title: "Test" }]}
              topTargetId="test"
            />
          </Col> */}
        </Container>
      </>
    );
  }
}

const closeToNavBar = { marginTop: -21 };
