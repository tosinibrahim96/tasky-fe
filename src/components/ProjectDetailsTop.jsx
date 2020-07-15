import React, { useState } from "react";
import { Col, Row, ListGroup, Form, Button } from "react-bootstrap";
import { useUpdateProject } from "../services/projects/projectsState";
import { PageTitleAndButton, ModalContainer, FormInput, Loader } from "./index";

const ProjectDetailsTop = ({ projectDetails }) => {
  const [showUpdateProject, setShowUpdateProject] = useState(false);
  const [updatedProject, updateProject] = useUpdateProject();
  const [projectData, setProjectData] = useState({
    name: projectDetails.name,
    description: projectDetails.description,
    amount_expected: projectDetails.amount_expected,
  });

  const handleCloseUpdateProject = () => setShowUpdateProject(false);
  const handleShowUpdateProject = () => setShowUpdateProject(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateProject(projectDetails.id, projectData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newProjectData = {
      ...projectData,
      [name]: value,
    };

    setProjectData(newProjectData);
  };

  const showErrors = () => {
    const errorValue = updatedProject.error;

    if (errorValue === "") {
      return <></>;
    }

    if (errorValue !== "" && errorValue.message.errors) {
      return (
        <ListGroup>
          {errorValue.message.errors.map((error) => (
            <ListGroup.Item variant="danger" key={error} className="mt-2 mb-2">
              {error}
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }

    if (errorValue !== "" && errorValue.message) {
      return (
        <ListGroup>
          <ListGroup.Item variant="danger" className="mb-2">
            {errorValue.message}
          </ListGroup.Item>
        </ListGroup>
      );
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };


  return updatedProject.projectDetails.id ? (
    refreshPage()
  ) : (
    <>
      <PageTitleAndButton
        pageTitle={projectDetails.name}
        buttonText="Update details"
        headerSize={1}
        handleClick={handleShowUpdateProject}
      />
      <Row>
        <Col md={6}>
          <ListGroup className="mt-4">
            <ListGroup.Item className="mb-2">
              <h4>Description</h4>
              <p>{projectDetails.description}</p>
            </ListGroup.Item>

            <ListGroup.Item variant="dark">
              <h4>Completed Payment</h4>
              <p>{`N${projectDetails.payments[0].amount_received}/ N${projectDetails.amount_expected}`}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <ListGroup className="mt-4">
            <ListGroup.Item className="mb-2">
              <h4>Date Created</h4>
              <p>{`${new Date(projectDetails.created_at).getDate()}/${new Date(
                projectDetails.created_at
              ).getMonth()}/${new Date(
                projectDetails.created_at
              ).getFullYear()}`}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <ModalContainer
        handleShow={showUpdateProject}
        handleClose={handleCloseUpdateProject}
        title="Update project info"
        footer={false}
      >
        {showErrors()}
        {updatedProject.loading ? (
          <Loader />
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              required={true}
              name="name"
              handleChange={handleInputChange}
              value={projectData.name}
              label="Project name"
            />
            <FormInput
              type="textarea"
              required={true}
              name="description"
              handleChange={handleInputChange}
              value={projectData.description}
              rows="3"
              label="Project description"
            />
            <FormInput
              type="number"
              required={true}
              name="amount_expected"
              handleChange={handleInputChange}
              value={projectData.amount_expected}
              label="Total amount expected"
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </ModalContainer>
    </>
  );
};

export { ProjectDetailsTop };
