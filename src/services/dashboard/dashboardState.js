import { useEffect, useReducer } from "react";
import { getInfo } from "./dashboardRequests";

const initialDashboardInfo = {
  loading: true,
  error: "",
  dashboardInfo: {},
};

const dashboardInfoReducer = (state, action) => {
  switch (action.type) {
    case "DASHBOARD_DATA_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "DASHBOARD_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        dashboardInfo: action.payload,
      };
    case "DASHBOARD_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const useGetDashboardInfo = () => {
  const [state, dispatch] = useReducer(
    dashboardInfoReducer,
    initialDashboardInfo
  );

  useEffect(() => {
    dispatch({ type: "DASHBOARD_DATA_LOADING" });
    const getDashboardInfo = async () => {
      try {
        const info = await getInfo();
        dispatch({ type: "DASHBOARD_DATA_SUCCESS", payload: info.data });
      } catch (error) {
        const payload = error.response ? error.response.data : error;
        dispatch({ type: "DASHBOARD_DATA_FAILURE", payload });
      }
    };
    getDashboardInfo();
  }, []);

  return state;
};

export { useGetDashboardInfo };
