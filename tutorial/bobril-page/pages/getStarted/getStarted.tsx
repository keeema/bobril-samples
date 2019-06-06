import * as b from "bobril";
import { Container, typography } from "bobrilstrap";

export class GettingStarted extends b.Component<{}> {
  render(): b.IBobrilChildren {
    return (
      <>
        <Container style={typography.textCenter}>
          <img src={b.asset("../../resources/bobril-logo.png")} />
          <h1>Bobril</h1>
          <p>some interesting text to hype</p>
        </Container>
      </>
    );
  }
}
