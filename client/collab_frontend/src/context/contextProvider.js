import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  token: null,
  alert: { open: false, severity: "info", message: "" },
  currentChannel: null,
  channels: [],
  messages: [],
  openCreateChannel: false,
  openEditChannel: false,
  openDeleteChannel: false,
  openCreateMessage: false,
  openEditMessage: false,
  openDeleteMessage: false,
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
