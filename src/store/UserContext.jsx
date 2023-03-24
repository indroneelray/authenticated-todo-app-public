import { createContext, useState } from "react";
import { Outlet } from "react-router";
import Avatar from "../assets/avatar.jpeg";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    token:''
  });

  return (
    <UserContext.Provider value={[userDetails, setUserDetails]}>
      {props.children}
      <Outlet />
    </UserContext.Provider>
  );
};
