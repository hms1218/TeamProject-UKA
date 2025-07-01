import { useState } from "react";
import CommentItem from "./CommentItem";

const CommentList = ({
    comments,
    currentUser,
    isAdmin,
    handleDeleteComment,
    handleDeleteReply,
    saveEditComment,
    saveEditReply,
    replyTargetId,
    setReplyTargetId,
    replyInput,
    setReplyInput,
    handleReplySubmit,
}) => {
    // 댓글/대댓글 수정용 상태
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');
    const [editReplyId, setEditReplyId] = useState(null);
    const [editReplyText, setEditReplyText] = useState('');

    // 재귀 렌더링 함수
    const renderCommentTree = (parentId = null, level = 0) => {
        const filtered = comments.filter(c => c.parentCommentId === parentId);
        return filtered.map(comment => (
        <CommentItem
            key={comment.id}
            comment={comment}
            level={level}
            currentUser={currentUser}
            isAdmin={isAdmin}
            editCommentId={editCommentId}
            editCommentText={editCommentText}
            setEditCommentId={setEditCommentId}  
            setEditCommentText={setEditCommentText}
            saveEditComment={() => {
                saveEditComment(editCommentId, editCommentText);
                setEditCommentId(null);
                setEditCommentText('');
            }}
            editReplyId={editReplyId}
            editReplyText={editReplyText}
            setEditReplyId={setEditReplyId}      
            setEditReplyText={setEditReplyText}
            saveEditReply={() => {
                saveEditReply(editReplyId, editReplyText);
                setEditReplyId(null);
                setEditReplyText('');
            }}
            handleDeleteComment={handleDeleteComment}
            handleDeleteReply={handleDeleteReply}
            // 수정모드로 바꾸는 함수
            EditComment={comment => { 
                setEditCommentId(comment.id);
                setEditCommentText(comment.content);
            }}
            EditReply={reply => {
                setEditReplyId(reply.id);
                setEditReplyText(reply.content);
            }}
            replyTargetId={replyTargetId}
            setReplyTargetId={setReplyTargetId}
            replyInput={replyInput}
            setReplyInput={setReplyInput}
            handleReplySubmit={handleReplySubmit}
            renderCommentTree={renderCommentTree}
        />
        ));
    };

    return <div>{renderCommentTree()}</div>;
};

export default CommentList;