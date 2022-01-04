import { useNotificationContext } from "../../store/NotificationContext";
import Notification from "../ui/Notification";
import MainHeader from "./MainHeader";

const Layout = ({ children }) => {
  const { notification } = useNotificationContext();

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
};

export default Layout;
