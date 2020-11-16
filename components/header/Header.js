import React from "react";

import { Navbar, Nav, Image, Row, Col } from "react-bootstrap";

import Link from "next/link";
import "../../styles/Home.module.css";

export default function Header() {
  //   const { sections, title } = props;

  return (
    <div>
      {/* <img src="/images/tri-logo-2.jpg" fluid width="150px" height="150px" /> */}

      <Row>
        <Col xs={4}></Col>
        <Col xs={8}>
          <Image src="/images/header-image.png" fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <Navbar bg="light" variant="light">
            <Nav className="justify-content-end">
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/events" passHref>
                <Nav.Link>Events</Nav.Link>
              </Link>
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
}

// Header.propTypes = {
//   sections: PropTypes.array,
//   title: PropTypes.string,
// };
