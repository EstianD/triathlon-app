import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";

// Import stylesheet
import styles from "./News.module.css";
// Import custom hooks
import useGetNews from "../hooks/useGetNews";

import NewsHeading from "./NewsHeading";
import NewsStory from "./NewsStory";

function News() {
  // Set page number to 1 to load first page
  const [pageNumber, setPageNumber] = useState(1);
  // Destructure variables from hook
  const { news, error, loading, hasMore } = useGetNews(pageNumber);

  const observer = useRef();
  const lastStoryElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("vissible");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // console.log("news:", news);
  // console.log("error:", error);
  // console.log("loading: ", loading);
  // console.log("hasmore: ", hasMore);

  return (
    <div>
      <Col>
        <Row>
          {news.map((story, i) => {
            if (i === 0) {
              return (
                <div key={news[0].news_id}>
                  <NewsHeading news={news[0]} />
                </div>
              );
            }
            if (i !== 0) {
              {
                /* Check if this is the last element on the page */
              }
              if (news.length === i + 1) {
                return (
                  <div
                    ref={lastStoryElement}
                    key={story.news_id}
                    style={{ width: "100%" }}
                  >
                    <NewsStory story={story} />
                  </div>
                );
              } else {
                return (
                  <div key={story.news_id} style={{ width: "100%" }}>
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
