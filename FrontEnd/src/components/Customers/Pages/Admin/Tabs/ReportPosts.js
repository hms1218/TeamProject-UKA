import React from 'react';
import { useQnA } from '../../../Context/QnAContext';
import { useNavigate } from 'react-router-dom';

const ReportedPosts = () => {
  const { qnas } = useQnA();
  const navigate = useNavigate();

  const reportedPosts = qnas.filter(q => q.isReported);

  return (
    <div>
      <h2>🚨 신고된 게시글</h2>
      {reportedPosts.length === 0 ? (
        <p>신고된 게시글이 없습니다.</p>
      ) : (
        <ul>
          {reportedPosts.map(post => (
            <li key={post.id} className="admin-post">
              <div
                className="admin-post-title"
                onClick={() => navigate(`/customer/qna/${post.id}`)}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                [신고 누적] {post.title}
              </div>
              <div className="admin-post-author">by {post.author}</div>
              <div className="admin-action-buttons">
                <button className="restore-btn" onClick={() => alert("복원되었습니다.")}>복원</button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm("삭제하시겠습니까?")) {
                      alert("삭제되었습니다.");
                    }
                  }}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportedPosts;
