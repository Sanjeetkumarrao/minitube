import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { HiThumbUp, HiPencil, HiTrash } from "react-icons/hi";
import { getVideoComments, addComment, updateComment, deleteComment, toggleCommentLike } from "../../services/index.js";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const CommentSection = ({ videoId, commentCount }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const res = await getVideoComments(videoId);
      setComments(res.data.data);
    } catch {
      console.error("Failed to fetch comments");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      await addComment(videoId, { content: newComment });
      setNewComment("");
      fetchComments();
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (commentId) => {
    try {
      await updateComment(commentId, { content: editContent });
      setEditingId(null);
      fetchComments();
      toast.success("Comment updated!");
    } catch {
      toast.error("Failed to update comment");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const handleLike = async (commentId) => {
    if (!user) return toast.error("Please login to like");
    try {
      await toggleCommentLike(commentId);
      fetchComments();
    } catch {}
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">{commentCount || comments.length} Comments</h3>

      {/* Add Comment */}
      {user && (
        <div className="flex gap-3 mb-6">
          <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              placeholder="Add a comment..."
              className="input border-b border-dark-border bg-transparent rounded-none px-0 focus:border-white"
            />
            {newComment && (
              <div className="flex gap-2 mt-2 justify-end">
                <button onClick={() => setNewComment("")} className="btn-secondary text-sm">
                  Cancel
                </button>
                <button onClick={handleAddComment} disabled={loading} className="btn-primary text-sm">
                  Comment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3">
            <img
              src={comment.owner?.avatar}
              alt={comment.owner?.username}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">@{comment.owner?.username}</span>
                <span className="text-dark-muted text-xs">{format(comment.createdAt)}</span>
              </div>

              {editingId === comment._id ? (
                <div>
                  <input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="input text-sm"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setEditingId(null)} className="btn-secondary text-xs">Cancel</button>
                    <button onClick={() => handleEdit(comment._id)} className="btn-primary text-xs">Save</button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-dark-text">{comment.content}</p>
              )}

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => handleLike(comment._id)}
                  className={`flex items-center gap-1 text-xs ${comment.isLiked ? "text-blue-400" : "text-dark-muted"} hover:text-blue-400 transition-colors`}
                >
                  <HiThumbUp className="w-4 h-4" />
                  <span>{comment.likesCount || ""}</span>
                </button>

                {user?._id === comment.owner?._id && (
                  <>
                    <button
                      onClick={() => { setEditingId(comment._id); setEditContent(comment.content); }}
                      className="text-dark-muted hover:text-dark-text transition-colors"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-dark-muted hover:text-red-400 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
