import React from "react";
import type { Comment } from "../types/Comment";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">Коментарів поки немає.</p>;
  }

  return (
    <div className="">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white rounded-lg shadow-lg p-6 mt-2"
        >
          <p className="text-gray-800">{comment.description}</p>
          <p className="text-sm text-gray-500 mt-2">{comment.date}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
