import React, { useState } from "react";
import Comment from "./Comment";

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "This is the first comment",
      replies: [
        {
          id: 2,
          text: "This is a nested reply",
          replies: [],
        },
      ],
    },
  ]);

  const [text, setText] = useState("");

  const addComment = () => {
    if (!text.trim()) return;
    setComments([...comments, { id: Date.now(), text, replies: [] }]);
    setText("");
  };

  const addReply = (id, replyText) => {
    const addNestedReply = (commentsList) =>
      commentsList.map((c) =>
        c.id === id
          ? {
              ...c,
              replies: [
                ...c.replies,
                { id: Date.now(), text: replyText, replies: [] },
              ],
            }
          : { ...c, replies: addNestedReply(c.replies) }
      );

    setComments(addNestedReply(comments));
  };

  const deleteComment = (id) => {
    const removeComment = (commentsList) =>
      commentsList
        .filter((c) => c.id !== id)
        .map((c) => ({ ...c, replies: removeComment(c.replies) }));

    setComments(removeComment(comments));
  };

  return (
    <div className="container">
      <h1>Comments</h1>
      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add comment..."
        />
        <button onClick={addComment}>Add</button>
      </div>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default Comments;
