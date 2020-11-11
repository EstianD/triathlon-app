import React, { useState, useEffect, useRef, useCallback } from "react";

import axios from "axios";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";

// Import stylesheet
import styles from "./News.module.css";
// Import custom hooks
import useGetNews from "../hooks/useGetNews";
// Import components
import NewsHeading from "./NewsHeading";
import NewsStory from "./NewsStory";

function News({ newsData }) {
  // Set page number to 1 to load first page
  const [pageNumber, setPageNumber] = useState(1);
  // Destructure variables from hook
  const { news, error, loading, hasMore } = useGetNews(pageNumber, newsData);

  // Function for detecting when last news article is vissible on page
  // When last story is vissible, increment page by 1 and retrieve the next page of data
  const observer = useRef();
  const lastStoryElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // Increment page number by 1 and set the state for the page
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <Col>
        <Row>
          {/* Loop through news data */}
          {news.map((story, i) => {
            {
              /* Set the first retrieved article as the heading */
            }
            if (i === 0) {
              return (
                <div key={news[0].newsId} style={{ width: "100%" }}>
                  <NewsHeading news={news[0]} />
                </div>
              );
            }
            {
              /* Display the rest of the articles */
            }
            if (i !== 0) {
              if (news.length === i + 1) {
                return (
                  <div
                    ref={lastStoryElement}
                    key={story.newsId}
                    style={{ width: "100%" }}
                  >
                    <NewsStory story={story} />
                  </div>
                );
              } else {
                return (
                  <div key={story.newsId} style={{ width: "100%" }}>
                    <NewsStory story={story} />
                  </div>
                );
              }
            }
          })}
        </Row>
        {loading && (
          <Row className="justify-content-md-center">
            <div className="my-auto">
              <Spinner
                className={styles.newsLoader}
                animation="border"
                variant="secondary"
              />
            </div>
          </Row>
        )}
      </Col>
    </div>
  );
}

export default News;
