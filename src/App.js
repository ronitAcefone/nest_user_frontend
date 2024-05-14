import React, { useState } from "react";
import Login from "./Components/Login";
import Main from "./Components/Main";
import Headers from "./Components/Common/Headers";
import { ToastContainer } from "react-toastify";
import Notification from "./Components/Common/Notification";

function App() {
  const [islogin, setIsLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const logoutHandler = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLogin(false);
  };
  return (
    <React.Fragment>
      <div className="App">
        <Notification />
        <header className="App-header">
          {islogin ? (
            <React.Fragment>
              <Headers logoutHandler={logoutHandler} />
              <Main />
            </React.Fragment>
          ) : (
            <Login setIsLogin={setIsLogin} />
          )}
          <ToastContainer />
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
