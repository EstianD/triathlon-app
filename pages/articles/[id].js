import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { Col, Row, Container } from "react-bootstrap";

import Header from "../../components/header/Header";
import Article from "../../components/main/Article";

import { getNewsIds, getArticle } from "../../lib/news";

function article({ article }) {
  // const router = useRouter();
  // const { article } = router.query;
  // console.log(ids);

  console.log("ARTICLE: ", article);

  return (
    <Container fluid="md">
      <Head>
        <title>Article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Article article={article} />
      <Row></Row>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  console.log("PARAMS: ", params.id);
  const article = await getArticle(params.id);

  return {
    props: { article },
  };
  console.log("RES DATA: ", res);
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
