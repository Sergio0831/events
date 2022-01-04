import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.scss";
import { useNotificationContext } from "../../store/NotificationContext";

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotificationContext();

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsLoading(false);
        });
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    showNotification({
      title: "Sending comment...",
      message: "Comment will store in database",
      status: "pending"
    });

    // send data to API
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) =>
        showNotification({
          title: "Success",
          message: "Successfully added a comment",
          status: "success"
        })
      )
      .catch((error) =>
        showNotification({
          title: "Error",
          message: error.message || "Something went wrong!",
          status: "error"
        })
      );
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && isLoading && <h2>Loading...</h2>}
      {showComments && !isLoading && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
