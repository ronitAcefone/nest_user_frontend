function Headers(props) {
  const logoutHandler = () => {
    props.logoutHandler();
  };
  return (
    <div className="bg-dark mb-3">
      <nav className="navbar navbar-expand-lg navbar-dark d-flex justify-content-between px-3">
        <label className="navbar-brand">Username</label>
        <button
          className="btn btn-outline-danger my-2 my-sm-0"
          type="submit"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Headers;
