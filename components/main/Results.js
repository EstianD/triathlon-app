import React, { useEffect, useState } from "react";

import { Col, Row, Table, Spinner, Image, Carousel } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
// Import hook to retrieve latest results
import useGetLatestResults from "../hooks/useGetLatestResults";

// Import stylesheet
import styles from "./Results.module.css";

function Results({ latestResults }) {
  const results = latestResults.LatestResults;

  // Set state for carousal index
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // console.log("LL", results);

  return (
    <div className={styles.resultsDiv}>
      <Row>
        <Col>
          <span className={styles.resultsHeading}>Latest Results</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.resultTitle}>{results.eventTitle}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <span className={styles.resultDate}>{results.eventDate}</span>
        </Col>
      </Row>
      <Row></Row>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {results.eventResults.map((program) => {
          return (
            <Carousel.Item key={uuidv4()}>
              <span className={styles.programName}>{program.progName}</span>
              {program.results.map((athlete) => {
                return (
                  <div key={athlete.athleteId}>
                    <Row>
                      <Col xs={1}>
                        <span className={styles.resultPosition}>
                          {athlete.position}
                        </span>
                      </Col>
                      <Col xs={1}>
                        <Image src={athlete.athleteFlag} />
                      </Col>
                      <Col xs={5}>
                        <span className={styles.resultsAthleteTitle}>
                          <a href={athlete.athleteProfile} target="_blank">
                            {athlete.athleteTitle}
                          </a>
                        </span>
                      </Col>
                      <Col xs={4}>
                        <span className={styles.resultAthleteTime}>
                          {athlete.totalTime}
                        </span>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Results;
