import { useEffect, useReducer } from "react";
import { getAll, save, getOne, update, remove } from "./projectRequests";

const initialState = {
  loading: true,
  error: "",
  projectsDetails: {},
  hasMore: false,
};

const createProjectInitialState = {
  loading: false,
  error: "",
  projectsDetails: {},
};

const getOneProjectInitialState = {
  loading: true,
  error: "",
  projectDetails: {},
};

const updateProjectInitialState = {
  loading: false,
  error: "",
  projectDetails: {},
};

const deleteProjectInitialState = {
  loading: false,
  error: "",
  projectDetails: {},
};

const getAllProjectsReducer = (state, action) => {
  switch (action.type) {
    case "ALLPROJECTS_DATA_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ALLPROJECTS_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        projectsDetails: action.payload,
        hasMore: action.payload.total > action.payload.to,
      };
    case "ALLPROJECTS_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const createNewProjectReducer = (state, action) => {
  switch (action.type) {
    case "CREATEPROJECT_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CREATEPROJECT_SUCCESS":
      return {
        ...state,
        loading: false,
        projectsDetails: action.payload,
      };
    case "CREATEPROJECT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const getOneProjectReducer = (state, action) => {
  switch (action.type) {
    case "ONEPROJECT_DATA_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ONEPROJECT_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        projectDetails: action.payload,
      };
    case "ONEPROJECT_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const updateProjectReducer = (state, action) => {
  switch (action.type) {
    case "UPDATEPROJECT_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "UPDATEPROJECT_SUCCESS":
      return {
        ...state,
        loading: false,
        projectDetails: action.payload,
      };
    case "UPDATEPROJECT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const deleteProjectReducer = (state, action) => {
  switch (action.type) {
    case "DELETEPROJECT_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "DELETEPROJECT_SUCCESS":
      return {
        ...state,
        loading: false,
        projectDetails: action.payload,
      };
    case "DELETEPROJECT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const useGetAllProjects = (currentPage) => {
  const [state, dispatch] = useReducer(getAllProjectsReducer, initialState);

  useEffect(() => {
    dispatch({ type: "ALLPROJECTS_DATA_LOADING" });
    const getAllProjects = async () => {
      try {
        const projects = await getAll(currentPage);
        dispatch({
          type: "ALLPROJECTS_DATA_SUCCESS",
          payload: state.projectsDetails.data
            ? {
                ...state,
                data: state.projectsDetails.data.concat(projects.data.data),
              }
            : projects.data,
        });
      } catch (error) {
        const payload = error.response ? error.response.data : error;
        dispatch({ type: "ALLPROJECTS_DATA_FAILURE", payload });
      }
    };
    getAllProjects();
  }, [currentPage]);

  return state;
};

const useCreateNewProject = () => {
  const [newProjectState, dispatch] = useReducer(
    createNewProjectReducer,
    createProjectInitialState
  );

  const createProject = async (newProject) => {
    dispatch({ type: "CREATEPROJECT_LOADING" });
    try {
      const project = await save(newProject);
      dispatch({ type: "CREATEPROJECT_SUCCESS", payload: project.data });
    } catch (error) {
      const payload = error.response ? error.response.data : error;
      dispatch({ type: "CREATEPROJECT_FAILURE", payload });
    }
  };
  return [newProjectState, createProject];
};

const useGetOneProject = (projectId) => {
  const [state, dispatch] = useReducer(
    getOneProjectReducer,
    getOneProjectInitialState
  );

  useEffect(() => {
    dispatch({ type: "ONEPROJECT_DATA_LOADING" });
    const getOneProject = async () => {
      try {
        const project = await getOne(projectId);
        dispatch({ type: "ONEPROJECT_DATA_SUCCESS", payload: project.data });
      } catch (error) {
        const payload = error.response ? error.response.data : error;
        dispatch({ type: "ONEPROJECT_DATA_FAILURE", payload });
      }
    };
    getOneProject();
  }, [projectId]);

  return state;
};

const useUpdateProject = () => {
  const [updatedProject, dispatch] = useReducer(
    updateProjectReducer,
    updateProjectInitialState
  );

  const updateProject = async (projectId, projectData) => {
    dispatch({ type: "UPDATEPROJECT_LOADING" });
    try {
      const project = await update(projectId, projectData);
      dispatch({ type: "UPDATEPROJECT_SUCCESS", payload: project.data });
    } catch (error) {
      const payload = error.response ? error.response.data : error;
      dispatch({ type: "UPDATEPROJECT_FAILURE", payload });
    }
  };
  return [updatedProject, updateProject];
};

const useDeleteProject = () => {
  const [deletedProject, dispatch] = useReducer(
    deleteProjectReducer,
    deleteProjectInitialState
  );

  const deleteProject = async (projectId) => {
    dispatch({ type: "DELETEPROJECT_LOADING" });
    try {
      const response = await remove(projectId);

      dispatch({ type: "DELETEPROJECT_SUCCESS", payload: response });
    } catch (error) {
      const payload = error.response ? error.response.data : error;
      dispatch({ type: "DELETEPROJECT_FAILURE", payload });
    }
  };
  return [deletedProject, deleteProject];
};

export {
  useGetAllProjects,
  useCreateNewProject,
  useGetOneProject,
  useUpdateProject,
  useDeleteProject,
};
