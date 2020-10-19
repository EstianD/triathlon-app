import Head from "next/head";
import styles from "../styles/Home.module.css";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import Container from "react-bootstrap/Container";

import Header from "../components/header/Header";
import News from "../components/main/News";
import Results from "../components/main/Results";

import { Col, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Container fluid="md">
      <Head>
        <title>Triathlon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <EventSlider /> */}
      <Row>
        <Col xs={9}>
          <News />
        </Col>
        <Col xs={3}>
          <Results />
        </Col>
      </Row>
    </Container>
  );
}
