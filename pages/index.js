import Head from "next/head";
import styles from "../styles/Home.module.css";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
// import Container from "react-bootstrap/Container";
import axios from "axios";

import { getSortedNews } from "../lib/news";
import { getLatestResults } from "../lib/results";

import Header from "../components/header/Header";
import News from "../components/main/News";
import Results from "../components/main/Results";

import { Col, Row, Container } from "react-bootstrap";

export default function Home({ newsData, resultData }) {
  // console.log("RESULTS: ", resultData);
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
          <News newsData={newsData} />
        </Col>
        <Col xs={3}>
          <Results latestResults={resultData} />
        </Col>
      </Row>
    </Container>
  );
}

export async function getStaticProps() {
  const newsData = await getSortedNews(1);
  const resultData = await getLatestResults();
  // console.log(resultData);
  // console.log("NEWSDATA: ", newsData);

  return { props: { newsData, resultData } };
}
