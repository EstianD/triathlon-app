import React, { useEffect } from "react";

import { Col, Row, Table, Spinner } from "react-bootstrap";

import useGetLatestResults from "../hooks/useGetLatestResults";

function Results() {
  const {
    resultsLoading,
    resultsError,
    results,
    resultsTitle,
  } = useGetLatestResults();
  //   const
  //   console.log(results.eventResults);

  console.log(results);
  //   console.log(typeof results.eventResults);
  //   results.eventResults.map((x) => {
  //     console.log(x);
  //   });
  return (
    <div>
      <Col>
        <Row>
          <Col>{resultsTitle}</Col>
        </Row>
        <Table responsive borderless>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((athlete) => {
              return (
                <tr>
                  <td>1</td>
                  <td>00</td>
                  <td>some title</td>
                  <td>some time</td>

                  {/* <Col xs={1}>1</Col>
                  <Col xs={1}>OO</Col>
                  <Col xs={6}>SOME TITLE</Col>
                  <Col xs={3}>sometime</Col> */}
                </tr>
              );
            })}
          </tbody>
        </Table>

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
        )}
      </Col>
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
