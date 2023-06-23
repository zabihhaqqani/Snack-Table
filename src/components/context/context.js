import { createContext, useContext } from "react";


export const Context = createContext()

function ContextProvider({children}) {

  

  return (
    <Context.Provider
      value={{
  
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;

export const useDataContext = () => useContext(Context)