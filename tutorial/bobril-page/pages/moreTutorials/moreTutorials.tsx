import * as b from "bobril";
import { Container } from "bobrilstrap";
import { Content } from "./content";

export class MoreTutorials extends b.Component<{}> {
  render(): b.IBobrilChildren {
    return (
      <Container>
        <Content />
      </Container>
    );
  }
}
