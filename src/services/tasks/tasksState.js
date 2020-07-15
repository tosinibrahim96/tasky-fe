import { useReducer } from "react";
import { save, update, remove } from "./taskRequests";

const createTaskInitialState = {
  loading: false,
  error: "",
  taskDetails: {},
};

const updateTaskInitialState = {
  loading: false,
  error: "",
  taskDetails: {},
};

const deleteTaskInitialState = {
  loading: false,
  error: "",
  taskDetails: {},
};

const createNewTaskReducer = (state, action) => {
  switch (action.type) {
    case "CREARETASK_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CREARETASK_SUCCESS":
      return {
        ...state,
        loading: false,
        taskDetails: action.payload,
      };
    case "CREARETASK_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const updateTaskReducer = (state, action) => {
  switch (action.type) {
    case "UPDATETASK_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "UPDATETASK_SUCCESS":
      return {
        ...state,
        loading: false,
        taskDetails: action.payload,
      };
    case "UPDATETASK_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const deleteTaskReducer = (state, action) => {
  switch (action.type) {
    case "DELETETASK_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "DELETETASK_SUCCESS":
      return {
        ...state,
        loading: false,
        taskDetails: action.payload,
      };
    case "DELETETASK_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const useCreateNewTask = () => {
  const [newTaskState, dispatch] = useReducer(
    createNewTaskReducer,
    createTaskInitialState
  );

  const createTask = async (newTask) => {
    dispatch({ type: "CREARETASK_LOADING" });
    try {
      const task = await save(newTask);
      dispatch({ type: "CREARETASK_SUCCESS", payload: task.data });
    } catch (error) {
      const payload = error.response ? error.response.data : error;
      dispatch({ type: "CREARETASK_FAILURE", payload });
    }
  };
  return [newTaskState, createTask];
};

const useUpdateTask = () => {
  const [updatedTask, dispatch] = useReducer(
    updateTaskReducer,
    updateTaskInitialState
  );

  const updateTask = async (newTask) => {
    dispatch({ type: "UPDATETASK_LOADING" });
    try {
      const task = await update(newTask);
      dispatch({ type: "UPDATETASK_SUCCESS", payload: task.data });
    } catch (error) {
      const payload = error.response ? error.response.data : error;
      dispatch({ type: "UPDATETASK_FAILURE", payload });
    }
  };
  return [updatedTask, updateTask];
};

const useDeletetask = () => {
  const [deletedTask, dispatch] = useReducer(
    deleteTaskReducer,
    deleteTaskInitialState
  );

  const deleteTask = async (taskId) => {
    dispatch({ type: "DELETETASK_LOADING" });
    try {
      const response = await remove(taskId);

      dispatch({ type: "DELETETASK_SUCCESS", payload: response });
    } catch (error) {
      const payload = error.response ? error.response.data : error;
      dispatch({ type: "DELETETASK_FAILURE", payload });
    }
  };
  return [deletedTask, deleteTask];
};

export { useCreateNewTask, useUpdateTask,useDeletetask };
