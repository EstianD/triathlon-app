import React, { useEffect } from "react";

import { Col, Row, Table, Spinner, Image } from "react-bootstrap";

import useGetLatestResults from "../hooks/useGetLatestResults";

// Import stylesheet
import styles from "./Results.module.css";

function Results({ latestResults }) {
  // const {
  //   resultsLoading,
  //   resultsError,
  //   results,
  //   resultsTitle,
  //   resultsDate,
  // } = useGetLatestResults();
  //   const
  //   console.log(results.eventResults);

  const results = latestResults.LatestResults;
  console.log(typeof latestResults);
  console.log("PRE: ", latestResults);
  console.log("RESULTS:  ", results);
  //   console.log(typeof results.eventResults);
  //   results.eventResults.map((x) => {
  //     console.log(x);
  //   });
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
      ))}

      {/* {resultsLoading && (
        <Row className="justify-content-md-center">
          <div className="my-auto">
            <Spinner
              //   className={styles.newsLoader}
              animation="border"
              variant="secondary"
            />
          </div>
        </Row>
      )} */}
    </div>
  );
  //   return (
  //     <div>
  {
    /* <Col>
        <Row>
          <Col>Latest Results</Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>

      </Col>

      
      {resultsLoading && (
        <Row className="justify-content-md-center">
          <div className="my-auto">
            <Spinner
              //   className={styles.newsLoader}
              animation="border"
              variant="secondary"
            />
          </div>
        </Row>
      )} */
  }
  //     </div>
  //   );
}

export default Results;
