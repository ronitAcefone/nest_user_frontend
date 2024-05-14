import React, { useEffect, useContext, useState } from "react";
import classes from "./Notification.module.css"; // Import the CSS file for styling
import NotificationContext from "../../Context_Providers/NotificationContext";

const Notification = () => {
  const notificationCtx = useContext(NotificationContext);
  const [classNames, setClassNames] = useState([
    `alert`,
    `${classes.notification}`,
  ]);
  useEffect(() => {
    if (notificationCtx.show) {
      setClassNames([
        `alert`,
        `alert-${notificationCtx.messageType}`,
        `${classes.notification}`,
      ]);
      setTimeout(
        () => {
          setClassNames([
            `alert`,
            `alert-${notificationCtx.messageType}`,
            `${classes.notification}`,
            `${classes.active}`,
          ]);
          setTimeout(() => {
            setClassNames([`${classes.notification}`]);
            notificationCtx.hide();
          }, 1000);
        },
        notificationCtx?.duration ? notificationCtx.duration : 2000
      );
    }
  }, [notificationCtx.message, notificationCtx.show, notificationCtx.duration]);

  return notificationCtx.show ? (
    <span className={classNames.join(" ")}>{notificationCtx.message}</span>
  ) : null;
};

export default Notification;
