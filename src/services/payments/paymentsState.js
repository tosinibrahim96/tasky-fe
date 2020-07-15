import { useReducer } from "react";
import { update } from "./paymentRequests";

const updatePaymentInitialState = {
  loading: false,
  error: "",
  paymentDetails: {},
};

const updatePaymentReducer = (state, action) => {
  switch (action.type) {
    case "UPDATEPAYMENT_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "UPDATEPAYMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        paymentDetails: action.payload,
      };
    case "UPDATEPAYMENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const useUpdatePayment = (projectId, paymentInfo) => {
  const [paymentState, dispatch] = useReducer(
    updatePaymentReducer,
    updatePaymentInitialState
  );

  const updatePayment = async (projectId, paymentInfo) => {
    dispatch({ type: "UPDATEPAYMENT_LOADING" });
    try {
      const payment = await update(projectId, paymentInfo);
      dispatch({ type: "UPDATEPAYMENT_SUCCESS", payload: payment.data });
    } catch (error) {
      const payload = error.response ? error.response.data : error;
      dispatch({ type: "UPDATEPAYMENT_FAILURE", payload });
    }
  };
  return [paymentState, updatePayment];
};

export { useUpdatePayment };
