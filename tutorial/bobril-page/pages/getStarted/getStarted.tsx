import * as b from "bobril";
import { Container, Jumbotron } from "bobrilstrap";
import { Header } from "./header";
import { ShortInfo } from "./shortInfo";
import { MarkdownHtml } from "./markdownHtml";

const getStarted = b.asset("../../resources/get-started.md");

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
          <MarkdownHtml path={getStarted} />
        </Container>
      </>
    );
  }
}

const closeToNavBar = { marginTop: -21 };

export const paddingForHeaderBobril = { paddingTop: 45 };
