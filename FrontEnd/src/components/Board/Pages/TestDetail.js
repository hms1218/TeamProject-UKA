import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
// import { useQnA } from '../Context/QnAContext';
import { useAlert } from '../Context/AlertContext';
import axios from 'axios';
import './TestDetail.css';

const qnas = [

]

const mockComments = [
  { id: 1, author: 'guest1', content: '저도 궁금해요.', date: '25.06.14' },
  { id: 2, author: 'user2', content: '답변 부탁드려요.', date: '25.06.14' },
];
const mockAdminAnswer = {
  answer: '입양 절차는 문의주시면 상세히 안내드립니다.',
  answerDate: '25.06.14',
};

const TestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alreadyRedirected = useRef(false);
  const [qna, setQna] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [comments, setComments] = useState(mockComments);
  const [commentInput, setCommentInput] = useState('');

  // 신고
  const [isReported, setIsReported] = useState(false);
  
  // 추천
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

//   const { qnas } = useQnA();
  const { showAlert } = useAlert();


  // 날짜 변환
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [date, time] = dateString.split('T');
    const [yyyy, mm, dd] = date.split('-');
  	const hhmm = time ? time.slice(0, 5) : '';
    return `${yyyy.slice(2)}.${mm}.${dd}`;
  };

  useEffect(() => {
    const checkPasswordAndShowAlert = async () => {
      const sorted = [...qnas].sort((a, b) => Number(b.id) - Number(a.id));
      const currentIndex = sorted.findIndex((q) => String(q.id) === String(id));
      const current = sorted[currentIndex];

      if (!current) return;

      if (
        current.isSecret &&
        sessionStorage.getItem(`qna_access_${current.id}`) !== 'true'
      ) {
        const input = window.prompt('🔒 비밀글입니다. 비밀번호를 입력해주세요');
        if (input !== current.password) {
          // 커스텀 알림
          showAlert && showAlert({
            title: '비밀번호 오류',
            text: '비밀번호가 틀렸습니다.',
            imageUrl: process.env.PUBLIC_URL + '/img/pwWhat.jpg',   // ← 확장자 포함!
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: '패스워드',
            icon: 'warning', // 주의: imageUrl이 있으면 icon은 무시됨!
        });
          navigate('/customer/qna');
          return;
        } else {
          sessionStorage.setItem(`qna_access_${current.id}`, 'true');
        }
      }
      if (current.isReported && !alreadyRedirected.current) {
        alreadyRedirected.current = true;
        showAlert && showAlert({
          title: '🚫 관리자 검토중',
          text: '신고가 누적된 글입니다.',
          imageUrl: process.env.PUBLIC_URL + '/img/badCat.jpg',   // ← 확장자 포함!
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: '조져쓰',
          icon: 'warning', // 주의: imageUrl이 있으면 icon은 무시됨!
        });
        return;
      }
      setQna(current);
      setPrev(sorted[currentIndex - 1] || null);
      setNext(sorted[currentIndex + 1] || null);
    };
    checkPasswordAndShowAlert();
  }, [id, showAlert, navigate]);

  // 추천여부 체크
	useEffect(() => {
	if (!qna) return;
	const liked = localStorage.getItem('qna_liked', 'true');
		setIsLiked(!!liked);
		setLikes(qna.likes ?? 0); // 게시글 바뀔 때 likes도 새로 세팅
	const reported = localStorage.getItem(`qna_reported_${qna.id}`);
		setIsReported(!!reported);
	}, [qna]);

  const handleLike = async () => {
    if (isLiked) {
      alert('이미 추천하셨습니다.');
      return;
    }

    // [2] 서버 추천 요청 (API 붙이기 전이면 주석)
    try {
      // 실제로는 아래 axios.post 활성화
      // await axios.post(`/api/qna/${qna.id}/like`);
      // setLikes(likes + 1);

      // (실습용) 그냥 바로 갱신
      setLikes(likes + 1);

      // 로컬에도 기록
      localStorage.setItem(`qna_liked_${qna.id}`, 'true');
      setIsLiked(true);
    } catch (e) {
      // 서버 에러: 이미 추천한 경우(409), 기타는 오류 안내
      if (e.response && e.response.status === 409) {
        alert('이미 추천하셨습니다.');
        setIsLiked(true);
      } else {
        alert('추천 처리 중 오류가 발생했습니다.');
      }
    }
  };

  if (!qna) return <p>게시글을 찾을 수 없습니다.</p>;

  // 이전/다음글 네비
  const handleSecretNavigate = async (post) => {
    if (post.isReported) {
	    showAlert && showAlert({
            title: '🚫 관리자 검토중',
            text: '신고가 누적된 글입니다.',
            imageUrl: process.env.PUBLIC_URL + '/img/badCat.jpg',   // ← 확장자 포함!
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: '조져쓰',
            icon: 'warning', // 주의: imageUrl이 있으면 icon은 무시됨!
    });
      return;
    }
    if (post.isSecret) {
      const result = await showAlert({
		title: '🔒 비밀글입니다',
		text: '비밀번호를 입력해주세요',
		icon: 'question',
		input: 'password',
		inputPlaceholder: '비밀번호',
		showCancelButton: true,
		confirmButtonText: '확인',
		cancelButtonText: '취소',
		});

		// ✅ 취소했으면 아무것도 안 하고 바로 return
		if (!result || result.isDismissed || result.isDenied || !result.isConfirmed) return;

		const password = result.value;
		if (!password) {
			await showAlert && showAlert({
				title: '⚠️ 비밀번호 입력 필요',
				text: '비밀번호를 입력해주세요.',
				imageUrl: process.env.PUBLIC_URL + '/img/tobeCattinue.jpg',   // ← 확장자 포함!
				imageWidth: 300,
				imageHeight: 300,
				imageAlt: '계속',
				icon: 'warning', // 주의: imageUrl이 있으면 icon은 무시됨!
        });
		return;
		}
		if (password !== post.password) {
		    showAlert && showAlert({
				title: '❌ 비밀번호 오류',
				text: '비밀번호가 틀렸습니다.',
				imageUrl: process.env.PUBLIC_URL + '/img/pwWhat.jpg',   // ← 확장자 포함!
				imageWidth: 300,
				imageHeight: 300,
				imageAlt: '패스워드',
				icon: 'warning', // 주의: imageUrl이 있으면 icon은 무시됨!
        });
		return;
		}
      window.sessionStorage.setItem(`qna_access_${post.id}`, 'true');
      navigate(`/customer/qna/${post.id}`);
    } else {
      navigate(`/customer/qna/${post.id}`);
    }
  };

  // 버튼 핸들러
  const handleEdit = () => navigate(`/customer/qna/${qna.id}/edit`, { state: qna });

	const handleDelete = async () => {
	const result = await showAlert({
		title: '삭제하시겠습니까?',
		text: '정말로 이 글을 삭제하시겠습니까?',
        imageUrl: process.env.PUBLIC_URL + '/img/what.jpg',   // ← 확장자 포함!
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: '에?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: '네, 삭제합니다',
		cancelButtonText: '아니오',
	});

	if (!result || !result.isConfirmed) return; // 취소 시 아무 동작 X

	// 실제 삭제 로직
	// await axios.delete(`/api/qna/${qna.id}`); // 서버연결시
		await showAlert && showAlert({
        title: '삭제 완료',
		text: '게시글이 삭제되었습니다.',
        imageUrl: process.env.PUBLIC_URL + '/img/helmetGood.png',   // ← 확장자 포함!
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: '좋았쓰(헬멧)',
        icon: 'warning', // 주의: imageUrl이 있으면 icon은 무시됨!
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
    });

	navigate('/customer/qna');
	};

  // 신고 버튼
const handleReport = async () => {
	if (isReported) {
    	await showAlert({
		title: '이미 신고하셨습니다.',
		imageUrl: process.env.PUBLIC_URL + '/img/code.jpg', // 예시
		imageWidth: 300,
		imageHeight: 250,
		imageAlt: '코딩',
		icon: 'info',
    });
    return;
  }

  // 1. 신고 확인 모달
  const result = await showAlert({
    title: '신고하시겠습니까?',
    text: '해당 게시글을 신고합니다.',
    imageUrl: process.env.PUBLIC_URL + '/img/what.jpg',   // ← 확장자 포함!
    imageWidth: 300,
    imageHeight: 300,
	imageAlt: '에?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '예',
    cancelButtonText: '아니오',
  });

  // 2. 예(확인) 누르면
  if (result && result.isConfirmed) {
    // 신고 처리 로직 (서버 연동 예정)
    localStorage.setItem(`qna_reported_${qna.id}`, 'true'); // 중복방지 예시
    showAlert({
      title: '',
    });
	await showAlert && showAlert({
        title: '신고하였습니다.',
        imageUrl: process.env.PUBLIC_URL + '/img/helmetGood.png',   // ← 확장자 포함!
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: '좋았쓰(헬멧)',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
    });
  }
};

  // 댓글 추가
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: 'me',
          content: commentInput,
          date: formatDate(new Date().toISOString().split('T')[0]),
        },
      ]);
      setCommentInput('');
    }
  };

  // 관리자 답변 수정/삭제
  const handleEditAnswer = () => alert('관리자 답변 수정 기능 준비중');
  const handleDeleteAnswer = () => alert('관리자 답변 삭제 기능 준비중');

  return (
    <div className="qna-detail-wrapper">
      {/* 1. 제목 */}
      <div className="qna-detail-title-row"
	  	style={{ 
			minWidth: '800px',
			height: '50px',
			alignItems: "flex-end",
			border: '1px solid #ededed',
			// borderRadius: 7,
        	background: '#f8f6ff',
		}}>
        <span className="qna-detail-title">{qna.title}</span>
        <div style={{ marginLeft: 15, fontSize: 18, fontWeight: 600 }}>
          {qna.isReported && <span className="qna-detail-reported" style={{ color: "#ff7676", marginRight: 10 }}>[신고됨]</span>}
          {qna.isSecret && <span className="qna-detail-secret" style={{ color: "#b19cd9" }}>🔒 비밀글</span>}
        </div>
      </div>
      {/* 2. 정보: 표 */}
      <table style={{
		minWidth: '800px',
        background: '#fafbfc',
        border: '1px solid #ededed',
        borderRadius: 7,
        marginBottom: 10,
        fontSize: 15,
        color: '#444',
        borderCollapse: 'collapse'
      }}>
        <tbody>
          <tr>
            <td style={{ background: '#f8f6ff', width: '15%', padding: 9, fontWeight: 700 }}>등록자명</td>
            <td style={{ background: '#fff', width: '18%', padding: 9 }}>{qna.author}</td>
            <td style={{ background: '#f8f6ff', width: '15%', padding: 9, fontWeight: 700 }}>등록일</td>
            <td style={{ background: '#fff', width: '20%', padding: 9 }}>{formatDate(qna.createdAt)}</td>
            <td style={{ background: '#f8f6ff', width: '13%', padding: 9, fontWeight: 700 }}>조회수</td>
            <td style={{ background: '#fff', width: '8%', padding: 9 }}>{qna.views ?? 0}</td>
            <td style={{ background: '#f8f6ff',width: '10%', padding: 9, fontWeight: 700 }}>추천수</td>
            <td style={{ background: '#fff', width: '8%', padding: 9 }}>{qna.likes ?? 0}</td>
          </tr>
        </tbody>
      </table>
      {/* 3. 본문 */}
      <div className="qna-detail-content">
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          fontFamily: 'inherit',
          background: 'none',
          border: 0,
          fontSize: 17,
        }}>{qna.content}</pre>
      </div>
      {/* 4. 관리자 답변 */}
      {qna.isAnswered && (
        <div className="qna-detail-answer">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div>
              <h3 style={{ display: 'inline', marginRight: 10, fontWeight: 700, fontSize: 16, color: "#222" }}>💬 관리자 답변</h3>
              <span style={{ fontWeight: 500, fontSize: 16 }}>{mockAdminAnswer.answer}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="qna-action-btn" style={{ fontSize: 13, padding: "4px 10px" }} onClick={handleEditAnswer}>수정</button>
              <button className="qna-action-btn" style={{ fontSize: 13, padding: "4px 10px" }} onClick={handleDeleteAnswer}>삭제</button>
            </div>
          </div>
          <div style={{ color: "#aaa", fontSize: 13 }}>답변일: {mockAdminAnswer.answerDate}</div>
        </div>
      )}
      {/* 5. 추천/신고 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '26px 0', gap: 10 }}>
		<button
			className="qna-detail-recommend-btn"
			onClick={handleLike}
			disabled={isLiked}
			style={{
				background: isLiked ? "#ddd" : "",
				color: isLiked ? "#aaa" : "#b19cd9",
				cursor: isLiked ? "not-allowed" : "pointer"
			}}
		>
		추천 {likes}
		</button>
        <span style={{ color: '#bbb', fontWeight: 700 }}>|</span>
        <button className="qna-detail-report-btn" onClick={handleReport}>신고</button>
      </div>
	  {/* 6. 수정/삭제/목록 (맨 하단) */}
      <div className="qna-detail-actions" style={{ marginTop: 34 }}>
        <button className="qna-action-btn" onClick={handleEdit}>✏️ 수정</button>
        <button className="qna-action-btn" onClick={handleDelete}>🗑 삭제</button>
        <button className="qna-action-btn" onClick={() => navigate('/customer/qna')}>← 목록</button>
      </div>
      {/* 7. 댓글 */}
      <div style={{ margin: "35px 0 0 0" }}>
        <h4 style={{ marginBottom: 12, fontWeight: 700, fontSize: 17 }}>댓글 <span style={{ color: '#b19cd9' }}>({comments.length})</span></h4>
        <div style={{ marginLeft: 3 }}>
          {comments.length === 0 && <div style={{ color: "#aaa" }}>등록된 댓글이 없습니다.</div>}
          {comments.map(c => (
            <div key={c.id} style={{
              marginBottom: 10, fontSize: 15, padding: '12px 0', borderBottom: '1px solid #f1f1f1'
            }}>
              <b>{c.author}</b> <span style={{ color: "#bbb", fontSize: 13, marginLeft: 8 }}>{c.date}</span>
              <div style={{ marginLeft: 2 }}>{c.content}</div>
            </div>
          ))}
        </div>
        <form style={{ display: "flex", gap: 8, marginBottom: 18, marginTop: 12 }} onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            style={{
              flex: 1,
              border: "1px solid #b19cd9",
              borderRadius: 7,
              fontSize: 16,
              padding: "8px 14px"
            }}
          />
          <button type="submit" className="qna-detail-recommend-btn">등록</button>
        </form>
      </div>
      
      {/* 8. 이전/다음글 네비 */}
      <div className="qna-navigation" style={{ marginTop: 36 }}>
        {prev && (
          <div className="qna-nav-item" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, background: '#1976d2', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 700 }}>
              ◀
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 700 }}>이전글</span>
              {/* 신고글, 비밀글, 구분자 */}
              {prev.isReported && (
                <span className="nav-reported" style={{ color: "#ff7676", fontWeight: 700, cursor: 'pointer', marginLeft: 4 }}
                  onClick={() => 
					showAlert && showAlert({
						title: '🚫 관리자 검토중',
						text: '신고가 누적된 글입니다.',
						imageUrl: process.env.PUBLIC_URL + '/img/badCat.jpg',   // ← 확장자 포함!
						imageWidth: 300,
						imageHeight: 300,
						imageAlt: '조져쓰',
						icon: 'warning', // 주의: imageUrl이 있으면 icon은 무시됨!
				})}
                >신고글</span>
              )}
              {prev.isReported && prev.isSecret && <span style={{ color: '#bbb' }}> | </span>}
              {prev.isSecret && (
                <span
                  className="nav-secret"
                  style={{ color: "#b19cd9", fontWeight: 600, cursor: prev.isReported ? 'default' : 'pointer', marginLeft: 4 }}
                  onClick={prev.isReported ? undefined : () => handleSecretNavigate(prev)}
                >비밀글</span>
              )}
              {!prev.isReported && !prev.isSecret && (
                <span className="qna-nav-title" style={{ color: "#333", cursor: "pointer", marginLeft: 4 }} onClick={() => handleSecretNavigate(prev)}>
                  {prev.title}
                </span>
              )}
            </div>
          </div>
        )}
        {next && (
          <div className="qna-nav-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: '#1976d2', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 700 }}>
              ▶
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 700 }}>다음글</span>
              {next.isReported && (
                <span className="nav-reported" style={{ color: "#ff7676", fontWeight: 700, cursor: 'pointer', marginLeft: 4 }}
                  onClick={() => 
					showAlert && showAlert({
						title: '🚫 관리자 검토중',
						text: '신고가 누적된 글입니다.',
						imageUrl: process.env.PUBLIC_URL + '/img/badCat.jpg',   // ← 확장자 포함!
						imageWidth: 300,
						imageHeight: 300,
						imageAlt: '조져쓰',
						icon: 'warning', // 주의: imageUrl이 있으면 icon은 무시됨!
				})}
                >신고글</span>
              )}
              {next.isReported && next.isSecret && <span style={{ color: '#bbb' }}> | </span>}
              {next.isSecret && (
                <span
                  className="nav-secret"
                  style={{ color: "#b19cd9", fontWeight: 600, cursor: next.isReported ? 'default' : 'pointer', marginLeft: 4 }}
                  onClick={next.isReported ? undefined : () => handleSecretNavigate(next)}
                >비밀글</span>
              )}
              {!next.isReported && !next.isSecret && (
                <span className="qna-nav-title" style={{ color: "#333", cursor: "pointer", marginLeft: 4 }} onClick={() => handleSecretNavigate(next)}>
                  {next.title}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDetail;
