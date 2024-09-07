// UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();
const backLink = process.env.REACT_APP_BACK_LINK;

export function UserProvider({ children }) {
  const [user, setUser] = useState('');

  const updateUser = (newUser) => {
    setUser(newUser);
  };


  return (
    <UserContext.Provider value={{ user, updateUser}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}