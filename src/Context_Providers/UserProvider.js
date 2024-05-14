import React, { useState } from 'react';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [reload, setReload] = useState(false);

  return (
    <UserContext.Provider value={{ reload, setReload }}>
      {children}
    </UserContext.Provider>
  );
}
    
export default UserProvider;
