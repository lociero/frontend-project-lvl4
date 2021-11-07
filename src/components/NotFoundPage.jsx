import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotFoundPage = () => (
  <Container>
    <Row className="justify-content-center">
      <Col xs="auto">
        <h1>Oops</h1>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col xs="auto">
        <h2>404 Not Found</h2>
      </Col>
    </Row>
  </Container>
);

export default NotFoundPage;
