import React, { useEffect } from "react";
import { Row, Col, Image, Media } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import parse from "html-react-parser";

// Import styles
import styles from "./Article.module.css";

// import article hook
import useGetArticle from "../hooks/useGetArticle";

function Article({ article }) {
  // const { articleInfo, loading, error } = useGetArticle(article);
  // console.log("SECOND: ", articleInfo);

  const renderBodyToHtml = (str) => {
    let parser = new DOMParser();
    return parser.parseFromString(str, "text/html").body;
  };

  return (
    <div className={styles.container}>
      <Col>
        <Row>
          <div className={styles.article}>
            <h1>{article.data.news_title}</h1>
          </div>
        </Row>
        <img
          className={styles.articleImage}
          // alt={image.alt}
          src={article.data.news_thumbnail} // use normal <img> attributes as props
          effect="blur"
          // onError={(e) => loadDefaultImage(e)}
        />
        <div className={styles.articleBody}>
          <p>{parse(article.data.body)}</p>
        </div>
      </Col>
    </div>
  );
}

export default Article;
