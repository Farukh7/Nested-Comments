import React from "react";

const ReplyBox = ({
  value,
  onChange,
  onAdd,
  showReplyBox,
  setShowReplyBox,
  hideReplyBox,
  setHideReplyBox,
}) => {
  return (
    <div className="reply-box">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add reply..."
      />
      <button
        onClick={() => {
          onAdd(), setHideReplyBox(!hideReplyBox);
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          setShowReplyBox(!showReplyBox), setHideReplyBox(!hideReplyBox);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default ReplyBox;
