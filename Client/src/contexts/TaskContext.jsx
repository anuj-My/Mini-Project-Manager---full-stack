import { createContext, useReducer } from "react";

const initialState = {
  data: {},
  loading: false,
  error: "",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        loading: false,
        error: "",
        data: {
          ...state.data,
          [action.payload.projectId]: action.payload.tasks,
        },
      };

    case "CREATE_DATA":
      const { task, projectId } = action.payload;
      return {
        ...state,
        loading: false,
        error: "",
        data: {
          ...state.data,
          [projectId]: [...(state.data[projectId] || []), task],
        },
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

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
