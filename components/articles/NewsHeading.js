import React, { useState } from "react";
import Link from "next/link";
import { Row, Col, Card } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
// Import Next images
import Image from "next/image";

import styles from "../../styles/NewsHeading.module.css";

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

  // Function for loading a default image if there is no image for article or image load fails
  const loadDefaultImage = (e) => {
    e.target.src = "/images/no-image.jpeg";
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
                <div className={styles.headingImage} style={hoverStyle}>
                  <Image
                    src={news.data.image}
                    // effect="blur"
                    width={500}
                    height={500}
                    onError={(e) => loadDefaultImage(e)}
                    priority={true}
                    // layout="fill"
                  />
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <Card.ImgOverlay>
                <Card.Title>{news.data.title.toUpperCase()}</Card.Title>

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
