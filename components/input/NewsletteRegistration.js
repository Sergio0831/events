import { useRef } from "react";
import { useNotificationContext } from "../../store/NotificationContext";
import classes from "./NewsletterRegistration.module.scss";

const NewsletteRegistration = () => {
  const { showNotification } = useNotificationContext();
  const emailRef = useRef();

  const registrationHandler = (event) => {
    event.preventDefault();

    showNotification({
      title: "Sign up...",
      message: "Registering for newsletter",
      status: "pending"
    });

    const enteredEmail = emailRef.current.value;

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) =>
        showNotification({
          title: "Success",
          message: "Successfully registered for newsletter",
          status: "success"
        })
      )
      .catch((error) =>
        showNotification({
          title: "Error",
          message: error.message || "Something went wrong",
          status: "error"
        })
      );
    emailRef.current.value = "";
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletteRegistration;
