import * as b from "bobril";
import { Container } from "bobrilstrap";
import { MarkdownHtml } from "../getStarted/markdownHtml";

const getStarted = b.asset("../../resources/eco-system.md");

export class EcoSystem extends b.Component<{}> {
  render(): b.IBobrilChildren {
    return (
      <Container>
        <MarkdownHtml path={getStarted} />
      </Container>
    );
  }
}
