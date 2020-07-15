import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, ProgressBar, Button } from "react-bootstrap";

const ProjectCard = ({
  completedPayment,
  completedTasks,
  project,
  showDeleteModal,
  reference
}) => {
  const bgcolors = ["secondary", "info", "dark", "primary", "warning"];
  return (
    <Col md={4} className="mt-3" key={project.id} ref={reference}>
      <Card
        style={{ height: "100%" }}
        border={bgcolors[Math.floor(Math.random() * (4 - 0 + 1)) + 0]}
      >
        <Card.Header
          style={{ textTransform: "capitalize" }}
        >{`Project name: ${project.name}`}</Card.Header>
        <Card.Body>
          <Card.Text>{project.description}</Card.Text>
          <small className="text-muted d-block">
            Task completed:
            {completedTasks === "No tasks yet" ? ` 0%` : ` ${completedTasks}%`}
            {completedTasks === "No tasks yet" ? (
              <ProgressBar now="0" />
            ) : (
              <ProgressBar
                variant={completedTasks >= 50 ? "success" : "danger"}
                now={completedTasks}
              />
            )}
          </small>
          <small className="text-muted d-block mt-2">
            Payment completed: {`${completedPayment}%`}
            <ProgressBar
              variant={completedPayment >= 50 ? "success" : "danger"}
              now={completedPayment}
            />
          </small>
          <Link to={`/projects/${project.id}`}>
            <Button className="mt-4" variant="dark">
              View details
            </Button>
          </Link>
          <Button
            className="mt-4 ml-4"
            variant="danger"
            onClick={showDeleteModal}
            datakey={project.id}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export { ProjectCard };
