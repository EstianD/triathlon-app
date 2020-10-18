import React, { useState } from "react";
import { Row, Col, Card, Image } from "react-bootstrap";

import styles from "./NewsHeading.module.css";

function NewsHeading({ news }) {
  const handleOnHover = () => {
    setHovered((prevState) => !prevState);
  };

  const handleOnHoverLeave = () => {
    setHovered((prevState) => !prevState);
  };

  const [hovered, setHovered] = useState(false);
  const hoverStyle = hovered
    ? {
        transform: "scale(1.2)",
        transition: "transform 0.5s ease",
      }
    : { transform: "scale(1)", transition: "transform 0.5s ease" };

  return (
    <div onMouseEnter={handleOnHover} onMouseLeave={handleOnHoverLeave}>
      <Card className={styles.newsHeadingCard}>
        <Row>
          <Col xs={6}>
            <div className={styles.overflow}>
              <Card.Img src={news.news_thumbnail} style={hoverStyle} />
            </div>
          </Col>
          <Col xs={6}>
            <Card.ImgOverlay>
              <Card.Title>{news.news_title.toUpperCase()}</Card.Title>
              {/* <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text> */}
            </Card.ImgOverlay>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default NewsHeading;
