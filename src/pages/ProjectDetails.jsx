import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import {
  Loader,
  TaskSection,
  ProjectDetailsTop,
  PaymentSection,
} from "../components";
import { useGetOneProject } from "../services/projects/projectsState";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = useGetOneProject(projectId);

  if (project.loading) {
    return <Loader />;
  }

  if (!project.loading && project.error) {
    const { error } = project;
    return (
      <div className="container">
        <div>
          <h1>{error.Error ? error.Error : error.message}</h1>
        </div>
      </div>
    );
  }

  if (project.projectDetails) {
    const { projectDetails } = project;
    return (
      <Container>
        <ProjectDetailsTop projectDetails={projectDetails} />
        <TaskSection projectDetails={projectDetails} />
        <PaymentSection projectDetails={projectDetails} />
      </Container>
    );
  }
};

export default ProjectDetails;
