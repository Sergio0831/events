import classes from "./EventContent.module.scss";

const EventContent = ({ children }) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;
