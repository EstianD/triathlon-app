import React, { useEffect } from "react";

import { Col, Row, Table, Spinner, Image } from "react-bootstrap";
// Import hook to retrieve latest results
import useGetLatestResults from "../hooks/useGetLatestResults";

// Import stylesheet
import styles from "./Results.module.css";

function Results({ latestResults }) {
  const results = latestResults.LatestResults;

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
      {results.eventResults.map((athlete) => (
        <div key={athlete.athleteId}>
          <Row>
            <Col xs={1}>
              <span className={styles.resultPosition}>{athlete.position}</span>
            </Col>
            <Col xs={1}>
              <Image src={athlete.athleteFlag} />
            </Col>
            <Col xs={5}>
              <span className={styles.resultsAthleteTitle}>
                {athlete.athleteTitle}
              </span>
            </Col>
            <Col xs={4}>
              <span className={styles.resultAthleteTime}>
                {athlete.totalTime}
              </span>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default Results;
