/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

// Create a LeaveContext
const LeaveContext = createContext();

// LeaveProvider component to manage state
const LeaveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(leaveReducer, initialState);

  return (
    <LeaveContext.Provider value={{ state, dispatch }}>
      {children}
    </LeaveContext.Provider>
  );
};

// Custom hook to use the context
const useLeaveContext = () => {
  const context = useContext(LeaveContext);
  if (!context) {
    throw new Error("useLeaveContext must be used within a LeaveProvider");
  }
  return context;
};

// Initial state and reducer function
const initialState = {
  deleting: false,
  showLogoutOption: false,
  showModal: false,
  formData: {
    days: "",
    from: "",
    to: "",
    options: "",
  },
  applications: [],
  loading: true,
  error: null,
  authToken: localStorage.getItem("authToken"),
};

const leaveReducer = (state, action) => {
  switch (action.type) {
    case "SET_DELETING":
      return { ...state, deleting: action.payload };
    case "SET_SHOW_LOGOUT_OPTION":
      return { ...state, showLogoutOption: action.payload };
    case "SET_SHOW_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_FORM_DATA":
      return { ...state, formData: action.payload };
    case "SET_APPLICATIONS":
      return { ...state, applications: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_AUTH_TOKEN":
      return { ...state, authToken: action.payload };
    default:
      return state;
  }
};

export { LeaveProvider, useLeaveContext };
