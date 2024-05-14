import React, { useContext, useRef } from "react";
import LOGIN from "../ApiService/Auth";
import NotificationContext from "../Context_Providers/NotificationContext";

function Login(props) {
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const notifyCtx = useContext(NotificationContext);

  const checkUser = async (username, password) => {
    try {
      const response = await LOGIN(username, password);
      const jsonData = await response.json();
      if (!response.ok) {
        throw new Error(jsonData.message);
      }
      if (jsonData.hasOwnProperty("token")) {
        localStorage.setItem("token", jsonData.token);
        sessionStorage.setItem("token", jsonData.token);
        return true;
      }
      return false;
    } catch (error) {
      notifyCtx.showMessage({
        message: error.message,
        messageType : "danger",
      });
      return false;
    }
  };

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const user = await checkUser(
        userNameRef.current.value,
        passwordRef.current.value
      );
      if (!user) {
        userNameRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        props.setIsLogin(true);
      }
    } catch (error) {      
      notifyCtx.showMessage({
        message: error.message,
        messageType : "danger",
        duration: 1000000
      });
    }
  };
  return (
    <section className="container vh-100">
      <div className="row d-flex justify-content-center align-items-center vh-100 text-center">
        <div
          className="col-sm-12 col-md-10 col-xl-6 bg-secondary rounded-5 p-3"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="tab-login"
        >
          <h3
            className="fw-normal mb-3 pb-3"
            style={{ "letter-spacing": "1px" }}
          >
            Log in
          </h3>
          <form onSubmit={loginHandler}>
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label" htmlFor="loginName">
                Email or username
              </label>
              <input
                type="text"
                name="username"
                ref={userNameRef}
                id="loginName"
                className="form-control"
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label" htmlFor="loginPassword">
                Password
              </label>
              <input
                type="password"
                name="password"
                ref={passwordRef}
                id="loginPassword"
                className="form-control"
              />
            </div>

            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-primary btn-block mb-4"
            >
              Sign in
            </button>
          </form>
        </div>
        <div
          className="tab-pane fade"
          id="pills-register"
          role="tabpanel"
          aria-labelledby="tab-register"
        ></div>
      </div>
    </section>
  );
}

export default Login;
