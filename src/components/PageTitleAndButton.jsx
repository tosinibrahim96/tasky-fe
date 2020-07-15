import React from "react";
import { Col, Row, Button } from "react-bootstrap";

const PageTitleAndButton = ({
  pageTitle,
  buttonText,
  handleClick,
  headerSize,
  topMargin,
}) => {
  return (
    <Row className={`mt-${topMargin || 4}`}>
      <Col md={8}>
        {headerSize === 1 ? (
          <h1 style={{ textTransform: "capitalize" }}>{pageTitle}</h1>
        ) : headerSize === 2 ? (
          <h2 style={{ textTransform: "capitalize" }}>{pageTitle}</h2>
        ) : headerSize === 3 ? (
          <h3 style={{ textTransform: "capitalize" }}>{pageTitle}</h3>
        ) : headerSize === 4 ? (
          <h4 style={{ textTransform: "capitalize" }}>{pageTitle}</h4>
        ) : headerSize === 5 ? (
          <h5 style={{ textTransform: "capitalize" }}>{pageTitle}</h5>
        ) : (
          <h6 style={{ textTransform: "capitalize" }}>{pageTitle}</h6>
        )}
      </Col>
      <Col className="offset-md-2" md={2}>
        <Button
          className="btn btn-primary mt-1 ml-md-4"
          style={{ width: "82%" }}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </Col>
    </Row>
  );
};

export { PageTitleAndButton };
