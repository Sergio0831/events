import { useContext } from "react";
import { useNotificationContext } from "../../store/NotificationContext";
import classes from "./Notification.module.scss";

const Notification = ({ title, message, status }) => {
  const { hideNotification } = useNotificationContext();

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
