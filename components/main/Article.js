import React, { useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";

// import article hook
import useGetArticle from "../hooks/useGetArticle";

function Article({ article }) {
  const { articleInfo, loading, error } = useGetArticle(article);
  console.log("SECOND: ", articleInfo);

  //   const renderArticle = () => {
  //      object.keys(articleInfo.data).map((obj, i) => {
  //         return (
  //            <div>{articleInfo.data[obj].data}</div>
  //         )
  //      })
  //   }

  return (
    <div>
      <Col>
        <Row>
          <Col xs={9}>
            {/* <Image src={articleInfo.data.news_thumbnail} /> */}
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Col>
    </div>
  );
}

export default Article;
