import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import {
  PageTitleAndButton,
  ModalContainer,
  TaskTable,
  FormInput,
  Loader,
} from "./index";
import {
  useCreateNewTask,
  useUpdateTask,
  useDeletetask,
} from "../services/tasks/tasksState";

const TaskSection = ({ projectDetails }) => {
  const [showAddTaskModal, setshowAddTaskModal] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [newTaskState, createTask] = useCreateNewTask();
  const [deletedTask, deleteTask] = useDeletetask();
  const [updatedTask, updateTask] = useUpdateTask();
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    project_id: projectDetails.id,
    status: "pending",
  });
  const [createOrUpdate, setCreateOrUpdate] = useState("Submit");
  const [modalTitle, setModalTitle] = useState("");
  const [dataKey, setDataKey] = useState("");

  const handleCloseAddTask = () => setshowAddTaskModal(false);
  const handleShowAddTask = () => setshowAddTaskModal(true);
  const handleCloseDeleteTask = () => setShowDeleteTask(false);
  const handleShowDeleteTask = () => setShowDeleteTask(true);

  const showDeleteModal = (event) => {
    handleShowDeleteTask();
    setDataKey(event.target.attributes.datakey.value);
  };

  const handleDeleteTask = (event) => {
    deleteTask(dataKey);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const operationType = event.target.attributes.name.value;
    operationType === "Submit" ? createTask(newTask) : updateTask(newTask);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newProjectData = {
      ...newTask,
      [name]: value,
    };

    setNewTask(newProjectData);
  };

  const handleShowEdit = (event) => {
    setCreateOrUpdate("Update");
    setModalTitle("Update task details");
    const taskToEdit = projectDetails.tasks.find((task) => {
      return task.id === event.target.attributes.datakey.value;
    });
    const { name, description, status, id } = taskToEdit;
    const projectUpdateData = {
      ...newTask,
      name,
      description,
      status,
      id,
    };
    setNewTask(projectUpdateData);

    handleShowAddTask();
  };

  const handleShowCreate = () => {
    setCreateOrUpdate("Submit");
    setModalTitle("Create a new task");
    setNewTask({
      name: "",
      description: "",
      project_id: projectDetails.id,
      status: "pending",
    });
    handleShowAddTask();
  };

  const showErrors = () => {
    const errorValue =
      newTaskState.error || updatedTask.error || deletedTask.error;

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

  return newTaskState.taskDetails.status ||
    updatedTask.taskDetails.status ||
    deletedTask.taskDetails.status ? (
    refreshPage()
  ) : (
    <>
      <PageTitleAndButton
        pageTitle="Tasks"
        buttonText="New task"
        headerSize={3}
        topMargin={5}
        handleClick={handleShowCreate}
      />

      <TaskTable
        projectDetails={projectDetails}
        handleShowEdit={handleShowEdit}
        handleShowDelete={showDeleteModal}
      />

      <ModalContainer
        handleShow={showAddTaskModal}
        handleClose={handleCloseAddTask}
        title={modalTitle}
        footer={false}
      >
        {showErrors("create")}
        {newTaskState.loading || updatedTask.loading ? (
          <Loader />
        ) : (
          <Form onSubmit={handleSubmit} name={createOrUpdate}>
            <FormInput
              type="text"
              placeholder="New task"
              required={true}
              name="name"
              handleChange={handleInputChange}
              value={newTask.name}
              label="Task Name"
            />
            <FormInput
              type="textarea"
              placeholder="Description of the new task"
              required={true}
              name="description"
              handleChange={handleInputChange}
              value={newTask.description}
              rows="3"
              label="Task Description"
            />
            <Form.Group>
              <Form.Label>Task status</Form.Label>
              <Form.Control
                as="select"
                value={newTask.status}
                onChange={handleInputChange}
                name="status"
                required
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In-progress</option>
                <option value="done">Done</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {createOrUpdate}
            </Button>
          </Form>
        )}
      </ModalContainer>

      <ModalContainer
        handleShow={showDeleteTask}
        handleClose={handleCloseDeleteTask}
        title="Delete a task"
        footer={true}
        leftButtonLabel="Close"
        leftButtonVariant="secondary"
        rightButtonLabel="Yes"
        rightButtonVariant="danger"
        handleClick={handleDeleteTask}
      >
        {showErrors("delete")}
        {deletedTask.loading ? (
          <Loader />
        ) : (
          <p>{`Are you sure you want to delete this task`}</p>
        )}
      </ModalContainer>
    </>
  );
};

export { TaskSection };
