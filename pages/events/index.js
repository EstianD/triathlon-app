import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "../../components/header/Header";
import SearchEvents from "../../components/main/SearchEvents";

import { getEvents } from "../../lib/events";

export default function index({ events }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  console.log(events);

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <Container fluid="md">
      <Header />
      <Row>
        <Col>
          <SearchEvents handleSearchChange={handleSearchChange} />
        </Col>
      </Row>
    </Container>
  );
}

// Pre-render event data
export async function getStaticProps() {
  const events = await getEvents();
  console.log(events);
  return { props: { events } };
}
