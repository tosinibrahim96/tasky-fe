import React from "react";
import { Link } from "react-router-dom";
import { useGetDashboardInfo } from "../services/dashboard/dashboardState";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { Loader } from "../components";

const Home = () => {
  const data = useGetDashboardInfo();

  if (data.loading) {
    return <Loader />;
  }

  if (!data.loading && data.error) {
    const { error } = data;

    return (
      <div className="container">
        <div>
          <h1>{error.Error ? error.Error : error.message}</h1>
        </div>
      </div>
    );
  }

  if (data.dashboardInfo) {
    const {
      dashboardInfo: {
        name,
        projects,
        tasks,
        total_amount_received,
        total_amount_expected,
      },
    } = data;

    return (
      <Container>
        <Row className="mt-4 mx-auto">
          <Col md={12}>
            <h1 className="text-center">Hi, {name}</h1>
          </Col>
          <Col md={12}>
            <h3 className="text-center">
              Here is an overview of your projects
            </h3>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={12} md={6} lg={4} className="mt-4">
            <Card border="primary" className="text-center">
              <Card.Header> Total number of projects</Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "2rem" }}>{projects}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="mt-4">
            <Card border="secondary" className="text-center">
              <Card.Header className="text-center">
                {" "}
                Total number of tasks
              </Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "2rem" }}>{tasks}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="mt-4">
            <Card border="success" className="text-center">
              <Card.Header>Total amount received</Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "1.5rem" }}>
                  {`N${total_amount_received} / N${total_amount_expected}`}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col
            style={{ width: "50%", margin: "0 auto" }}
            md={2}
          >
            <Link to={"/projects"}>
              <Button className="btn btn-primary" size="lg">
                View projects
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Home;
