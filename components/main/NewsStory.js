import React, { useState } from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import styles from "./NewsStory.module.css";

function NewsStory({ story }) {
  const handleOnHover = () => {
    setHovered((prevState) => !prevState);
  };

  const handleOnHoverLeave = () => {
    setHovered((prevState) => !prevState);
  };

  // Calculate the difference in Minutes
  function calcMinutesDiff(now, dateStory) {
    let millisecondsDiff = dateStory - now;
    // console.log("now: ", dateStory);
    // console.log("then: ", now);
    let minutesDiff = Math.floor(millisecondsDiff / 60000);
    console.log(millisecondsDiff);
  }
  // Calculate differece in hours
  function calcHoursDiff() {}

  // Calculate difference in days
  function calcDaysDiff() {}

  function calculateTimeDifference(storyDate) {
    const dateNow = new Date().getTime();
    const datePublished = new Date(storyDate).getTime();
    // console.log("1: ", dateNow);
    // console.log("2: ", datePublished);
    calcMinutesDiff(dateNow, datePublished);
  }

  calculateTimeDifference(story.news_entry_date);

  const [hovered, setHovered] = useState(false);
  const imageHoverStyle = hovered
    ? { transform: "scale(1.2)", transition: "transform 0.5s ease" }
    : { transform: "scale(1)", transition: "transform 0.5s ease" };

  const cardHoverStyle = hovered
    ? {
        transform: "scale(1.01)",
        boxShadow: "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
        cursor: "pointer",
        background: "rgb(250, 250, 250)",
      }
    : {
        display: "relative",
        borderBottom: "0.5px solid rgb(170, 170, 170)",
        // borderRadius: "4px",
        background: "#fff",
      };

  return (
    <div onMouseEnter={handleOnHover} onMouseLeave={handleOnHoverLeave}>
      <Card className={styles.cardHoverStyle} style={cardHoverStyle}>
        <Row>
          <Col xs={4} md={4}>
            <div className={styles.overflow}>
              <Image
                src={story.news_thumbnail}
                className={styles.newsImage}
                style={imageHoverStyle}
              />
            </div>
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{story.news_title}</Card.Title>
              {/* <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text> */}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default NewsStory;
