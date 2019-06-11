import * as b from "bobril";

import { Row, Col, Size } from "bobrilstrap";
export function ShortInfo(): b.IBobrilNode {
  return (
    <Row>
      <Col span={3} size={Size.Sm}>
        <h4>Type safe</h4>
        TypeScript Framework for fast development of single-page applications
        for web
      </Col>
      <Col span={3} size={Size.Sm}>
        <h4>Component-based</h4>
        Compose page from encapsulated UI or virtual components
      </Col>
      <Col span={3} size={Size.Sm}>
        <h4>Power</h4>
        Optimized for high speed, small size and great developer experience
      </Col>
      <Col span={3} size={Size.Sm}>
        <h4>Opinionated</h4>
        Distributed with eco-system for build, translations, state management
        etc.
      </Col>
    </Row>
  );
}
