import React from 'react';
import { useQnA } from '../../../Context/QnAContext'; 
import { useNavigate } from 'react-router-dom';

const NewQnA = () => {
  const { qnas } = useQnA();
  const navigate = useNavigate();

  const newQnAs = qnas.filter(q => !q.isAnswered);

  return (
    <div>
      <h2>🆕 미답변 QnA</h2>
      {newQnAs.length === 0 ? (
        <p>미답변 QnA가 없습니다.</p>
      ) : (
        <ul>
          {newQnAs.map(qna => (
            <li key={qna.id} className="admin-post">
              <div
                className="admin-post-title"
                onClick={() => navigate(`/customer/qna/${qna.id}/admin`)}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                {qna.isSecret ? '🔒' : ''} {qna.title}
              </div>
              <div className="admin-post-author">
                작성자: {qna.author} | 작성일: {new Date(qna.createdAt).toLocaleString()}
              </div>
              <div className="admin-post-status">⌛ 미답변</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewQnA;
