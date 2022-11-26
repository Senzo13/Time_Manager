import React, { useState, createContext, useEffect } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const obj = {
    email: "",
    id: "",
    role: "",
    username: "",
    token: "",
  };

  const [user, setUser] = useState(obj);
  return (
    <StateContext.Provider value={{ user, setUser }}>
      {props.children}
    </StateContext.Provider>
  );
};
