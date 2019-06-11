import * as b from "bobril";
import { typography, Row, Col, Size, hiddenStyles, Device } from "bobrilstrap";
import { paddingForHeaderBobril } from "./getStarted";
export function Header(data: { large?: boolean }): b.IBobrilNode {
  const styles = data.large
    ? [hiddenStyles(Device.Xs)]
    : [
        hiddenStyles(Device.Sm),
        hiddenStyles(Device.Md),
        hiddenStyles(Device.Lg)
      ];
  return (
    <Row style={[...styles, data.large && typography.textCenter]}>
      <Col
        size={Size.Sm}
        span={6}
        style={data.large ? typography.textRight : typography.textCenter}
      >
        <img
          src={b.asset("../../resources/bobril_logo_200x200.png")}
          height={200}
        />
      </Col>
      <Col
        size={Size.Sm}
        span={6}
        style={[
          data.large ? typography.textLeft : typography.textCenter,
          data.large && paddingForHeaderBobril
        ]}
      >
        <h1>Bobril</h1>
      </Col>
    </Row>
  );
}
