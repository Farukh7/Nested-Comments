import { useState } from "react";
import ReplyBox from "./ReplyBox";

const Comment = ({ comment, addReply, deleteComment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [hideReplyBox, setHideReplyBox] = useState(true);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    addReply(comment.id, replyText);
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div className="comment">
      <div className="comment-box">
        <div className="avatar">C</div>
        <div className="comment-text">
          <p>{comment.text}</p>
          <div className="comment-actions">
            {hideReplyBox && (
              <>
                <button
                  onClick={() => {
                    setShowReplyBox(!showReplyBox);
                    setHideReplyBox(!hideReplyBox);
                  }}
                >
                  Reply
                </button>
                <button onClick={() => deleteComment(comment.id)}>
                  Delete
                </button>
              </>
            )}
          </div>

          {showReplyBox && (
            <ReplyBox
              value={replyText}
              onChange={setReplyText}
              onAdd={handleReply}
              showReplyBox={showReplyBox}
              setShowReplyBox={setShowReplyBox}
              hideReplyBox={hideReplyBox}
              setHideReplyBox={setHideReplyBox}
            />
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((r) => (
            <Comment
              key={r.id}
              comment={r}
              addReply={addReply}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
