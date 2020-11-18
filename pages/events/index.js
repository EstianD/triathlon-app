import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "../../components/header/Header";
import SearchEvents from "../../components/events/SearchEvents";
import EventCard from "../../components/events/EventCard";

import { getEvents } from "../../lib/events";

export default function index({ events }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(events.eventData);
  console.log(events);

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const renderEvents = () => {
    if (searchResults) {
      searchResults.map((event) => {
        console.log(event);
        return (
          <Col xs={3}>
            <EventCard />
          </Col>
        );
      });
    }
  };

  return (
    <Container fluid="md">
      <Header />
      <Row>
        <Col>
          <SearchEvents handleSearchChange={handleSearchChange} />
        </Col>
      </Row>
      <Row>{renderEvents()}</Row>
    </Container>
  );
}

// Pre-render event data
export async function getStaticProps() {
  const events = await getEvents();
  console.log(events);
  return { props: { events } };
}
