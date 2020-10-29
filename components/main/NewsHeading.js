import React, { useState } from "react";
import Link from "next/link";
import { Row, Col, Card, Image } from "react-bootstrap";

import styles from "./NewsHeading.module.css";

// Import service
import calcTimeDifference from "../services/calcTimeDifference";

function NewsHeading({ news }) {
  // console.log("head: ", news);
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
      <Link href={"/articles/" + news.newsId}>
        <Card className={styles.newsHeadingCard}>
          <Row>
            <Col xs={6}>
              <div className={styles.overflow}>
                <Card.Img src={news.data.image} style={hoverStyle} />
              </div>
            </Col>
            <Col xs={6}>
              <Card.ImgOverlay>
                <Card.Title>{news.data.title.toUpperCase()}</Card.Title>
                {/* <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text> */}
                {calcTimeDifference(news.data.date)}
              </Card.ImgOverlay>
            </Col>
          </Row>
        </Card>
      </Link>
    </div>
  );
}

export default NewsHeading;
