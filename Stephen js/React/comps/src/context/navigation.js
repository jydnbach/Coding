import { createContext, useState, useEffect } from "react";

const NavigationConext = createContext();

function NavigationProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => {};

    window.addEventListener("popstate", handler);
  }, []);

  return (
    <NavigationConext.Provider value={{}}>
      {currentPath}
      {children}
    </NavigationConext.Provider>
  );
}
export { NavigationProvider };
export default NavigationConext;
