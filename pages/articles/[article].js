import Head from "next/head";
import { useRouter } from "next/router";

import { Col, Row, Container } from "react-bootstrap";

import Header from "../../components/header/Header";
import Article from "../../components/main/Article";

function article() {
  const router = useRouter();
  console.log(router);
  const { article } = router.query;

  console.log("ROUTER: ", article);

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

export default article;
