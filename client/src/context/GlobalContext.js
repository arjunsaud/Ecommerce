import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthDetails } from "../slices/auth.slice";


export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => {
    return state.auth;
  });

  const [query, setQuery] = useState();

  const setSearchQuery = (data) => {
    setQuery(data);
  };

  const logout = () => {
    dispatch(resetAuthDetails());
  };

  return (
    <GlobalContext.Provider value={{setSearchQuery,role,query,logout }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
