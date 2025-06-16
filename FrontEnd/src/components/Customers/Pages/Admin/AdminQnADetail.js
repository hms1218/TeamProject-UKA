import { useParams } from 'react-router-dom';
import { useQnA } from '../../Context/QnAContext'; 
import { useState } from 'react';
import './AdminQnADetail.css';

const AdminQnADetail = () => {
  const { id } = useParams();
  const { qnas, setQnas } = useQnA();
  const qna = qnas.find(q => q.id === Number(id));

  const [answer, setAnswer] = useState(qna.answer || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleAnswerSubmit = () => {
    const updatedQnas = qnas.map(q =>
      q.id === qna.id
        ? { ...q, answer, isAnswered: true }
        : q
    );
    setQnas(updatedQnas);
    setIsEditing(false);
    alert('답변이 저장되었습니다!');
  };

return (
    <div>
      <h2>QnA 답변</h2>
      <p><strong>질문:</strong> {qna.title}</p>
      <p>세부내용 : {qna.content}</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="답변 내용을 입력하세요"
        rows={5}
        cols={50}
      />
      <br />
      <div className="qna-admin-buttons">
        {!qna.isAnswered || isEditing ? (
          <button className="qna-save-btn" onClick={handleAnswerSubmit}>
            답변 저장
          </button>
        ) : (
          <button className="qna-edit-btn" onClick={() => setIsEditing(true)}>
            답변 수정
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminQnADetail;
