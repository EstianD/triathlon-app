import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Header from "../../components/header/Header";
import SearchEvents from "../../components/events/SearchEvents";
import EventCard from "../../components/events/EventCard";
import CategorySelect from "../../components/events/CategorySelect";
import SpecificationSelect from "../../components/events/SpecificationSelect";
import CountrySelect from "../../components/events/CountrySelect";
import DatePicker from "../../components/events/DatePicker";

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
        <Col xs={3}>
          {/* <SearchEvents handleSearchChange={handleSearchChange} /> */}
          <CategorySelect />
        </Col>
        {/* <Col xs={3}> */}
        {/* <SpecificationSelect /> */}
        {/* </Col> */}
        <Col xs={3}>
          <CountrySelect />
        </Col>
        <Col xs={4}>
          <DatePicker />
        </Col>
        <Col xs={2}>
          <Button variant="light">Search</Button>{" "}
        </Col>
      </Row>
      <Row>{renderEvents()}</Row>
    </Container>
  );
}

// Pre-render event data
export async function getStaticProps() {
  const events = await getEvents();
  // console.log(events);
  return { props: { events } };
}
