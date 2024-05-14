import { useContext, useEffect, useState } from "react";
import { deleteUser, getUsers } from "../ApiService/Users";
import Table from "./Common/Table";
import UserForm from "./UserForm";
import UserContext from "../Context_Providers/UserContext";
import NotificationContext from "../Context_Providers/NotificationContext";
import Pagination from "./Common/Pagination";

function UserList() {
  let [totalUsers, setTotalUsers] = useState(10);
  let [perPageCount, setPerPageCount] = useState(3);
  let [users, setUsers] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);
  const notifyCtx = useContext(NotificationContext);

  const { reload, setReload } = useContext(UserContext);

  const deleteHandler = async (e) => {
    let id = e?.target?.id ? e.target.id : null;
    if (!id) return;
    const random = Math.floor(Math.random().toFixed(3) * 1000);
    const resp = prompt(
      "Are you sure to delete this user? Enter " + random + " to confirm."
    );
    if (resp === random.toString()) {
      const resp = await deleteUser(id);
      if (resp?.success) {
        setReload(!reload);
        notifyCtx.showMessage({
          message: resp.message,
        });
      }
    }
  };
  const fetchUsers = async (e, page = 1) => {
    try {
      let skip = (page-1) * perPageCount;
      let count = skip;
      let resp = await getUsers(skip, perPageCount);
      console.log('resp: ', resp);
      if (resp.count) setTotalUsers(resp.count);
      let data = resp?.data?.length ? resp.data : [];
      setUsers(
        data.map((el) => {
          el.sn = ++count;
          el.edit = <UserForm type="edit" user={el} reload={setReload} />;
          el.delete = (
            <button
              className="btn btn-danger"
              id={el._id}
              onClick={deleteHandler}
            >
              Delete
            </button>
          );
          return el;
        })
      );
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  const getUsersHandler = async (e, page) => {};
  useEffect(() => {
    fetchUsers();
  }, [reload]);
  const headings = [
    {
      id: "sn",
      value: "S.No.",
    },
    {
      id: "username",
      value: "Username",
    },
    {
      id: "email",
      value: "email",
    },
    {
      id: "roles",
      value: "Roles",
    },
    {
      id: "edit",
      value: "Edit",
    },
    {
      id: "delete",
      value: "Delete",
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-3">
      <Table headings={headings} data={users} />
      <Pagination
        total={totalUsers}
        pageCount={perPageCount}
        pageChangeHandler={fetchUsers}
      />
    </div>
  );
}

export default UserList;
