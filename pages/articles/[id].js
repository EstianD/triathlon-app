import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { Col, Row, Container } from "react-bootstrap";

import Header from "../../components/header/Header";
import Article from "../../components/articles/Article";
import Results from "../../components/results/Results";

import { getNewsIds, getArticle } from "../../lib/news";
import { getLatestResults } from "../../lib/results";

function article({ article, resultData }) {
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
        <Col xs={3}>
          <Results latestResults={resultData} />
        </Col>
      </Row>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  // console.log("PARAMS: ", params.id);
  const article = await getArticle(params.id);
  let resultData;
  // Check if article is related to a event
  console.log("EVENT CLIENT SIDE: ", article.data.related_event);
  if (article.data.related_event) {
    resultData = await getLatestResults(article.data.related_event);
  } else {
    resultData = await getLatestResults();
  }

  return {
    props: { article, resultData },
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
