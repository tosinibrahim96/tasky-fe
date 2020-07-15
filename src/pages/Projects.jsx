import React, { useState, useRef, useCallback } from "react";
import {
  useGetAllProjects,
  useCreateNewProject,
  useDeleteProject,
} from "../services/projects/projectsState";
import {
  Loader,
  ProjectCard,
  PageTitleAndButton,
  ModalContainer,
  FormInput,
} from "../components";
import { Container, Row, Button, Form, ListGroup } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Projects = () => {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProjectState, createProject] = useCreateNewProject();
  const [deletedProject, deleteProject] = useDeleteProject();
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [dataKey, setDataKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    amount_received: "0",
    amount_expected: "0",
  });

  const data = useGetAllProjects(currentPage);
  const observer = useRef();
  const lastProjectCardRef = useCallback(
    (node) => {
      if (data.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.hasMore) {
          setCurrentPage((currentPage) => currentPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [data.loading, data.hasMore]
  );

  const handleCloseAddProject = () => setShowAddProjectModal(false);
  const handleShowAddProject = () => setShowAddProjectModal(true);
  const handleCloseDeleteProject = () => setShowDeleteProject(false);
  const handleShowDeleteProject = () => setShowDeleteProject(true);

  const showDeleteModal = (event) => {
    handleShowDeleteProject();
    setDataKey(event.target.attributes.datakey.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createProject(newProject);
  };

  const handleDeleteProject = (event) => {
    deleteProject(dataKey);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newProjectData = {
      ...newProject,
      [name]: value,
    };

    setNewProject(newProjectData);
  };

  const showErrors = () => {
    const errorValue = newProjectState.error || deletedProject.error;

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

  if (data.loading && currentPage===1) {
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

  const refreshPage = () => {
    window.location.reload();
  };

  if (data.projectsDetails) {
    const {
      projectsDetails: { data: projects },
    } = data;

    return newProjectState.projectsDetails.id ? (
      <Redirect to={`/projects/${newProjectState.projectsDetails.id}`} />
    ) : (
      <Container>
        <PageTitleAndButton
          pageTitle="All projects"
          buttonText="New project"
          handleClick={handleShowAddProject}
          headerSize={1}
        />
        <Row className="mt-4">
          {projects.map((project, index) => {
            const completedPayment = isNaN(
              (project.last_payment.amount_received * 100) /
                project.amount_expected
            )
              ? 0
              : Math.floor(
                  (project.last_payment.amount_received * 100) /
                    project.amount_expected
                );

            const completedTasks =
              project.total_tasks < 1
                ? "No tasks yet"
                : isNaN((project.completed_tasks * 100) / project.total_tasks)
                ? 0
                : Math.floor(
                    (project.completed_tasks * 100) / project.total_tasks
                  );

            if (projects.length === index + 1) {
              return (
                <ProjectCard
                  completedPayment={completedPayment}
                  completedTasks={completedTasks}
                  project={project}
                  key={project.id}
                  showDeleteModal={showDeleteModal}
                  reference={lastProjectCardRef}
                />
              );
            } else {
              return (
                <ProjectCard
                  completedPayment={completedPayment}
                  completedTasks={completedTasks}
                  project={project}
                  key={project.id}
                  showDeleteModal={showDeleteModal}
                />
              );
            }
          })}
        </Row>
        {data.loading && currentPage>1?<Loader />:<></>};
        <ModalContainer
          handleShow={showAddProjectModal}
          handleClose={handleCloseAddProject}
          title="Create a new project"
          footer={false}
        >
          {showErrors()}

          {newProjectState.loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                placeholder="Uber"
                required={true}
                name="name"
                handleChange={handleInputChange}
                value={newProject.name}
                label="Project Name"
              />
              <FormInput
                type="textarea"
                placeholder="American multinational ride-hailing company offering services that include peer-to-peer ridesharing"
                required={true}
                name="description"
                handleChange={handleInputChange}
                value={newProject.description}
                rows="3"
                label="Project Description"
              />
              <FormInput
                type="number"
                placeholder="0"
                required
                name="amount_expected"
                value={newProject.amount_expected}
                handleChange={handleInputChange}
                label="Total payment expected"
              />

              <FormInput
                type="number"
                placeholder="0"
                required
                name="amount_received"
                value={newProject.amount_received}
                handleChange={handleInputChange}
                label="Total confirmed payment"
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </ModalContainer>
        {deletedProject.projectDetails.status ? (
          refreshPage()
        ) : (
          <ModalContainer
            handleShow={showDeleteProject}
            handleClose={handleCloseDeleteProject}
            title="Delete a project"
            footer={true}
            leftButtonLabel="Close"
            leftButtonVariant="secondary"
            rightButtonLabel="Yes"
            rightButtonVariant="danger"
            handleClick={handleDeleteProject}
          >
            {showErrors()}
            {deletedProject.loading ? (
              <Loader />
            ) : (
              <p>{`Are you sure you want to delete this project`}</p>
            )}
          </ModalContainer>
        )}
      </Container>
    );
  }
};

export default Projects;
