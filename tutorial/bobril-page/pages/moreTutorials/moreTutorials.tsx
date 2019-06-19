import * as b from "bobril";
import { Container, Col, Size } from "bobrilstrap";
import { Content, buildPageRoute, content } from "./content";
import { SideBar } from "../sidebar/sidebar";

export const pageInfo = buildPageRoute(
  {
    name: "more-tutorials",
    url: "more-tutorials",
    handler: () => <MoreTutorials />
  },
  content
);

export class MoreTutorials extends b.Component<{}> {
  render(): b.IBobrilChildren {
    return (
      <Container>
        <Col size={Size.Sm} span={9}>
          <Content />
        </Col>
        <Col size={Size.Sm} span={3}>
          <SideBar
            items={pageInfo.item.subs!}
            topTargetId={pageInfo.route.name + "-top"}
          />
        </Col>
      </Container>
    );
  }
}
