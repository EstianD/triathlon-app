import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

import { getSortedNews } from "../lib/news";
import { getLatestResults } from "../lib/results";

import Header from "../components/header/Header";
import News from "../components/articles/News";
import Results from "../components/results/Results";

import { Col, Row, Container } from "react-bootstrap";

export default function Home({ newsData, resultData }) {
  // console.log("RES: ", resultData);
  return (
    <Container fluid="md">
      <Head>
        <title>Triathlon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

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

// Pre-render initial data before page loads
export async function getStaticProps() {
  // Retrieve news data for the first page
  const newsData = await getSortedNews(1);

  // Retrieve latest completed event results
  const resultData = await getLatestResults();

  // console.log(resultData);
  return { props: { newsData, resultData } };
}
