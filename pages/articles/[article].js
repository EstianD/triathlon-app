import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { Col, Row, Container } from "react-bootstrap";

import Header from "../../components/header/Header";
import Article from "../../components/main/Article";

function article({ todos }) {
  // const router = useRouter();
  // console.log(router);
  // const { article } = router.query;

  // console.log("ROUTER: ", article);
  console.log(todos);
  return (
    <Container fluid="md">
      <Head>
        <title>Article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <Article article={article} /> */}
      <Row></Row>
    </Container>
  );
}

// export async function getStaticPaths() {
//   // Call external API
//   console.log("SOME STATIC PATH");
//   // const res = await axios.get("/api/article");
//   // console.log(res);
//   const paths = [
//     {
//       params: { id: 5 },
//     },
//   ];
//   return { paths, fallback: false };
// }

// export async function getStaticProps() {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
//   const todos = await res.json();

//   return { props: { todos } };
// }

export default article;
