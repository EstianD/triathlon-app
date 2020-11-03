import React, { useState } from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import styles from "./NewsStory.module.css";

// import function to calculate time differences for article post dates
import calcTimeDifference from "../services/calcTimeDifference";

function NewsStory({ story }) {
  const handleOnHover = () => {
    setHovered((prevState) => !prevState);
  };

  const handleOnHoverLeave = () => {
    setHovered((prevState) => !prevState);
  };

  const [hovered, setHovered] = useState(false);
  const imageHoverStyle = hovered
    ? { transform: "scale(1.2)", transition: "transform 0.5s ease" }
    : { transform: "scale(1)", transition: "transform 0.5s ease" };

  const cardHoverStyle = hovered
    ? {
        transform: "scale(1.00)",
        boxShadow: "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
        cursor: "pointer",
        background: "rgb(250, 250, 250)",
      }
    : {
        display: "relative",
        borderBottom: "0.5px solid rgb(170, 170, 170)",
        background: "#fff",
      };

  // Function for loading a default image if there is no image for article or image load fails
  const loadDefaultImage = (e) => {
    e.target.src = "/images/no-image.jpeg";
  };

  return (
    <div onMouseEnter={handleOnHover} onMouseLeave={handleOnHoverLeave}>
      <Card className={styles.cardHoverStyle} style={cardHoverStyle}>
        <Row>
          <Col xs={4} md={4}>
            <div className={styles.overflow}>
              <Image
                src={story.data.image}
                className={styles.newsImage}
                style={imageHoverStyle}
                onError={(e) => loadDefaultImage(e)}
              />
            </div>
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{story.data.title}</Card.Title>

              {calcTimeDifference(story.data.date)}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default NewsStory;
