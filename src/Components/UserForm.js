import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { addUser, updateUser } from "../ApiService/Users";
import UserContext from "../Context_Providers/UserContext";
import NotificationContext from "../Context_Providers/NotificationContext";

Modal.setAppElement("#root");

const DEFAULT_FORMDATA = {
  username: "",
  password: "",
  email: "",
  user_add: false,
  user_update: false,
  user_delete: false,
};

function UserForm(props) {
  const prepareEditFormData = (user) => {
    if (!user) return DEFAULT_FORMDATA;
    const prefillObj = {
      username: user?.username ? user.username : "",
      password: user?.password ? user.password : "",
      email: user?.email ? user.email : "",
      user_add: user.roles?.length ? user.roles.includes("USER_ADD") : false,
      user_update: user.roles?.length
        ? user.roles.includes("USER_UPDATE")
        : false,
      user_delete: user.roles?.length
        ? user.roles.includes("USER_DELETE")
        : false,
    };
    return prefillObj;
  };
  const { showMessage } = useContext(NotificationContext);
  const { reload } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(
    props.type === "edit" ? prepareEditFormData(props.user) : DEFAULT_FORMDATA
  );
  const customStyles = {
    content: {
      background: "grey",
      color: "black",
      padding: "40px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userPayload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        roles: [],
      };
      if (formData?.user_add === true) {
        userPayload.roles.push("USER_ADD");
      }
      if (formData?.user_update === true) {
        userPayload.roles.push("USER_UPDATE");
      }
      if (formData?.user_delete === true) {
        userPayload.roles.push("USER_DELETE");
      }
      let resp;
      if (props?.type === "edit") {
        resp = await updateUser(props.user._id, userPayload);
      } else {
        resp = await addUser(userPayload);
      }
      if (props?.reload) {
        props.reload(!reload);
      }
      setFormData(DEFAULT_FORMDATA);
      closeModal();
    } catch (error) {
      console.log("error: ", error);
      setFormData(DEFAULT_FORMDATA);
      closeModal();
      showMessage({
        message : error.message,
        duration : 3000
      });
    }
  };

  useEffect(() => {
    setFormData(
      props.type === "edit" ? prepareEditFormData(props.user) : DEFAULT_FORMDATA
    );
  }, [props.user]);

  return (
    <div className="">
      <button className="btn btn-primary" onClick={openModal}>
        {props?.type === "edit" ? "Edit" : "Add"} User
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={
          (props?.type === "edit" ? "Edit" : "Add") + " User Details"
        }
      >
        <h2>{props?.type === "edit" ? "Edit" : "Add"} User</h2>
        <form onSubmit={handleSubmit} className="bg-secondary p-3 rounded-3">
          <div className="row mb-2">
            <div className="col-sm-3">Username:</div>
            <div className="col-sm-9">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-3">Password:</div>
            <div className="col-sm-9">
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-3">Email:</div>
            <div className="col-sm-9">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-3">Autherization: </div>
            <div className="col-sm-9">
              User Add
              <input
                className="m-2"
                type="checkbox"
                name="user_add"
                checked={formData.user_add}
                onChange={handleChange}
              />
              User Update
              <input
                className="m-2"
                type="checkbox"
                name="user_update"
                checked={formData.user_update}
                onChange={handleChange}
              />
              User Delete
              <input
                className="m-2"
                type="checkbox"
                name="user_delete"
                checked={formData.user_delete}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UserForm;
