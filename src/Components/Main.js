import { useContext } from "react";
import UserContext from "../Context_Providers/UserContext";
import UserForm from "./UserForm";
import UserList from "./UserList";

function Main(props) {
  
  const { reload, setReload } = useContext(UserContext);
  
  return (
    <div>
      <div className="d-flex justify-content-around">
        <h1>Users List</h1>
        <UserForm reload={setReload} />
      </div>
      <UserList />
    </div>
  );
}

export default Main;
