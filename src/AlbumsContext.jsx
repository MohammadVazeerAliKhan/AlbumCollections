import React, { createContext, useState } from "react";

// Create a context with a default value (can be any value or object)
const MyContext = createContext();

// Create a provider component
const MyContextProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);

  return (
    <MyContext.Provider value={{ albums, setAlbums }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
