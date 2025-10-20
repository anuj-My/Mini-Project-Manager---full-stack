import { createContext, useReducer } from "react";

const initialState = {
  data: [],
  currentProject: null,
  loading: false,
  error: "",
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        loading: false,
        error: "",
        data: action.payload,
      };
    case "GET_PROJECT":
      return {
        ...state,
        loading: false,
        error: "",
        currentProject: action.payload,
      };

    case "CREATE_DATA":
      return {
        ...state,
        loading: false,
        error: "",
        data: [...state.data, action.payload],
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        loading: false,
        error: "",
        data: state?.data?.filter((item) => item._id !== action.payload),
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
