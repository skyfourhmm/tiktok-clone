import { createContext, useState } from "react";

const UserContext = createContext({ data: {}, auth: false });

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ data: {}, auth: false});
  
    // Login updates the user data with a name parameter
    const login = (data) => {
      setUser(() => ({
        data: data,
        auth: true,
      }));
    };
  
    // Logout updates the user data to default
    const logout = () => {
      setUser(() => ({
        data: {},
        auth: false,
      }));
      localStorage.removeItem('token')
      localStorage.removeItem('nickname')
    };
  
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  }

  export {UserContext, UserProvider}