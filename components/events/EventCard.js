import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function EventCard() {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Event Name</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Date</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Event Venue</Card.Subtitle>
          <Row>
            <Col xs={9}>
              <Card.Text>Country</Card.Text>
            </Col>
            <Col xs={3}>Flag</Col>
          </Row>
          <Card.Link href="#">More info</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EventCard;
