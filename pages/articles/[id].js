import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { Col, Row, Container } from "react-bootstrap";

import Header from "../../components/header/Header";
import Article from "../../components/main/Article";

import { getNewsIds, getArticle } from "../../lib/news";
// import { getLatestResults } from "../lib/results";

function article({ article }) {
  // console.log("ARTICLE DATA: ", article);
  return (
    <Container fluid="md">
      <Head>
        <title>Article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row>
        <Col xs={9}>
          <Article article={article} />
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  // console.log("PARAMS: ", params.id);
  const article = await getArticle(params.id);

  // Check if article is related to a event
  console.log("EVENT_ID: ", article.data.related_event);
  // const resultsData = await getLatestResults();

  return {
    props: { article },
  };
}

export async function getStaticPaths() {
  // Call external API
  const ids = await getNewsIds();

  const paths = ids.map((id) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: false };
}

export default article;
