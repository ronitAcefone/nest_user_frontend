import { useReducer } from "react";
import NotificationContext from "./NotificationContext";
import STRINGS from "../Common/Strings";

const NotificationProvider = ({ children }) => {
  const loginReducer = (state, action) => {
    switch (action.type) {
      case STRINGS.NOTIFICATION_ACTIONS.SHOW_MESSAGE:
        state = {
          show: true,
          message: action.message,
          duration: action.duration,
          messageType: action.messageType,
        };
        break;
      case STRINGS.NOTIFICATION_ACTIONS.HIDE:
        state = {
          ...state,
          show: false,
          duration: 0,
          message: "",
          messageType: "info",
        };
        break;
      default:
        return state;
    }
    return state;
  };
  const [notificationState, dispatch] = useReducer(loginReducer, {
    message: "",
    messageType: "",
    duration: 0,
  });
  const showMessageHandler = ({
    message = "",
    messageType = "info",
    duration = 2000,
  }) => {
    dispatch({
      type: STRINGS.NOTIFICATION_ACTIONS.SHOW_MESSAGE,
      message,
      duration,
      messageType,
    });
  };
  const hideHandler = () => {
    dispatch({
      type: STRINGS.NOTIFICATION_ACTIONS.HIDE,
    });
  };
  const notificationCtxValues = {
    message: notificationState.message,
    messageType: notificationState.messageType,
    duration: notificationState.duration,
    show: notificationState.show,
    showMessage: showMessageHandler,
    hide: hideHandler,
  };
  return (
    <NotificationContext.Provider value={notificationCtxValues}>
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;
