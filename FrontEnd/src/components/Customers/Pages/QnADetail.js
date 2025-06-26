import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAlert } from '../Context/AlertContext';
import { useAdmin } from '../../../api/AdminContext';
import { fetchQnaDetail, editQna, deleteQna } from '../../../api/CustomerApiData';
import axios from 'axios';
import './QnADetail.css';

const QnADetail = () => {
    const { id } = useParams();
    console.log("[QnADetail] useParams id:", id);
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const { isAdmin } = useAdmin(); // 어드민 임시(추후 삭제 필요)

    const [qna, setQna] = useState(null);
    const [qnas, setQnas] = useState([]); // 전체 QnA 목록
    const [prev, setPrev] = useState(null); // 이전글
    const [next, setNext] = useState(null); // 다음글

    const [editMode, setEditMode] = useState(false);
    const [answerEditMode, setAnswerEditMode] = useState(false);
    const [editData, setEditData] = useState({ title: '', content: '' });
    const [answerInput, setAnswerInput] = useState('');
    const isOwner = false; // 임시 추후 삭제 필요

    // 추가: 추천/신고 상태 관리
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isReported, setIsReported] = useState(false);

    // 댓글 관련 state
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');
    const [commentInput, setCommentInput] = useState('');

    // QnA 상세 및 전체 목록 불러오기
    useEffect(() => {(async () => {
        try {
            const res = await fetchQnaDetail(id);
            if (res.qnaIsReported === 'Y') {
                await showAlert({
                title: '접근 불가',
                text: '신고가 누적된 글입니다.',
                icon: 'warning',
                });
                navigate('/customer/qna');
                return;
            }
        if (res.qnaIsSecret === 'Y') {
            console.log(1);
            // 비밀글인데 비밀번호 없으면 입력받기
            let password = window.sessionStorage.getItem(`qna_pw_${id}`);
            if (!password) {
                
            const result = await showAlert({
                title: '🔒 비밀글입니다',
                text: '비밀번호를 입력해주세요',
                input: 'password',
                showCancelButton: true,
                confirmButtonText: '확인',
                cancelButtonText: '취소',
            });
            if (!result?.isConfirmed || !result.value) {
                navigate('/customer/qna');
                return;
            }
            password = result.value;
            window.sessionStorage.setItem(`qna_pw_${id}`, password);
            }
            const validated = await fetchQnaDetail(id, password);
            setQna(validated);
        } else {
            setQna(res);
        }
        setEditData({ qnaTitle: res.qnaTitle, qnaContent: res.qnaContent });
        setAnswerInput(res.qnaAnswer || '');
        setQnas([res]);
        } catch (err) {
        if (err?.response?.status === 403) {
            // 403 에러는 비밀번호 필요 상태로 간주
            let password = window.sessionStorage.getItem(`qna_pw_${id}`);
            if (!password) {
            // 비밀번호 입력 모달 띄우기
            const result = await showAlert({
                title: '🔒 비밀글입니다',
                text: '비밀번호를 입력해주세요',
                input: 'password',
                showCancelButton: true,
                confirmButtonText: '확인',
                cancelButtonText: '취소',
            });
            if (!result?.isConfirmed || !result.value) {
                navigate('/customer/qna');
                return;
            }
            password = result.value;
            window.sessionStorage.setItem(`qna_pw_${id}`, password);
            // 비밀번호 입력 후 다시 상세조회
            try {
                const validated = await fetchQnaDetail(id, password);
                setQna(validated);
                setEditData({ qnaTitle: validated.qnaTitle, qnaContent: validated.qnaContent });
                setAnswerInput(validated.qnaAnswer || '');
                setQnas([validated]);
            } catch (innerErr) {
                await showAlert({
                title: '비밀번호 오류',
                text: '비밀번호가 틀렸습니다.',
                icon: 'warning',
                });
                window.sessionStorage.removeItem(`qna_pw_${id}`);
                navigate('/customer/qna');
            }
            } else {
            await showAlert({
                title: '비밀번호 오류',
                text: '비밀번호가 틀렸습니다.',
                icon: 'warning',
            });
            window.sessionStorage.removeItem(`qna_pw_${id}`);
            navigate('/customer/qna');
            }
        } else {
            await showAlert({
            title: '오류',
            text: '게시글을 불러오는 중 오류가 발생했습니다.',
            icon: 'error',
            });
            navigate('/customer/qna');
        }
        }
    })();
    }, [id, navigate, showAlert]);

// 날짜 변환
const formatDate = (dateString) => {
    if (!dateString) return '';
    const [date, time] = dateString.split('T');
    const [yyyy, mm, dd] = date.split('-');
    const hhmm = time ? time.slice(0, 5) : '';
    return `${yyyy.slice(2)}.${mm}.${dd}`;
};

// 이전/다음글 찾기
useEffect(() => {
    if (!qnas || qnas.length === 0) return;
    const sorted = [...qnas].sort((a, b) => Number(b.id) - Number(a.id));
    const currentIndex = sorted.findIndex((q) => String(q.id) === String(id));
    const current = sorted[currentIndex];
    if (!current) return;
    if (isAdmin) {
        setQna(current);
        setPrev(sorted[currentIndex - 1] || null);
        setNext(sorted[currentIndex + 1] || null);
        return;
    }
    // 비밀번호 접근권한 체크
    if (current.isSecret && sessionStorage.getItem(`qna_access_${current.id}`) !== 'true') {
        showAlert && showAlert({
            title: '비밀번호 오류',
            text: '잘못된 접근입니다. 비밀번호 인증 후 접근하세요.',
            icon: 'warning',
        });
        navigate('/customer/qna');
        return;
    }
    setQna(current);
    setPrev(sorted[currentIndex - 1] || null);
    setNext(sorted[currentIndex + 1] || null);
}, [id, qnas, isAdmin, showAlert, navigate]);

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

    // 복원, 삭제, 완전삭제 함수들은 원하는 대로 정의
  const handleRestore = async () => {
    const result = await showAlert({
		title: '복원하시겠습니까?',
		imageUrl: process.env.PUBLIC_URL + '/img/what.jpg',
		imageWidth: 300,
		imageHeight: 300,
		imageAlt: '에?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: '네, 복원',
		cancelButtonText: '아니오',
    });
	// 취소 시
    if (!result || !result.isConfirmed) return;

	// QnA 리스트에서 복원 처리 (isReported: false, reportCount: 0)
	setQnas(prev =>
		prev.map(q =>
		q.id === qna.id
			? { ...q, isReported: false, reportCount: 0 }
			: q
		)
	);

	// 로컬스토리지에서도 신고카운트/신고상태 리셋
	localStorage.removeItem(`qna_reportCount_${qna.id}`);
	localStorage.removeItem(`qna_reported_${qna.id}`);

    // 실제 복원 로직 (API 호출 등)
    await showAlert({
		title: '복원되었습니다.',
		imageUrl: process.env.PUBLIC_URL + '/img/helmetGood.png',
		imageWidth: 300,
		imageHeight: 300,
		imageAlt: '좋았쓰(헬멧)',
		icon: 'success',
		timer: 1200,
		showConfirmButton: false
	});
  };

    // 댓글 수정 버튼 클릭 시
    const handleEditComment = (comment) => {
        setEditCommentId(comment.id);
        setEditCommentText(comment.content);
    };

    const handleSaveEditComment = () => {
        if (!editCommentText.trim()) return; // 빈 값 방지

        setQnas(prevQnas =>
            prevQnas.map(item =>
                item.id === qna.id
                    ? {
                        ...item,
                        comments: item.comments.map(c =>
                            c.id === editCommentId ? { ...c, content: editCommentText } : c
                        ),
                    }
                    : item
            )
        );
        setEditCommentId(null);
        setEditCommentText('');
    };

    const handleDeleteComment = async (commentId) => {
        const result = await showAlert({
            title: "댓글 삭제",
            text: "정말 댓글을 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
        });
        if (!result || !result.isConfirmed) return;

        setQnas(prevQnas =>
            prevQnas.map(item =>
                item.id === qna.id
                    ? {
                        ...item,
                        comments: item.comments.filter(c => c.id !== commentId),
                    }
                    : item
            )
        );
    };

  // 이전/다음글 네비
  const handleSecretNavigate = async (post) => {
    // 어드민은 상관없음
    if (isAdmin) {
      navigate(`/customer/qna/${post.id}`);
      return;
    }
    if (post.isReported) {
	    showAlert && showAlert({
            title: '🚫 관리자 검토중',
            text: '신고가 누적된 글입니다.',
            // imageUrl: process.env.PUBLIC_URL + '/img/badCat.jpg',   // ← 확장자 포함!
            // imageWidth: 300,
            // imageHeight: 300,
            // imageAlt: '조져쓰',
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
				imageUrl: process.env.PUBLIC_URL + '/img/pwWhat.jpg',   // ← 확장자 포함!
				imageWidth: 300,
				imageHeight: 300,
				imageAlt: '패스워드',
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

    //   qna 본문 수정
    const handleEditQna = async () => {
        if (!editData.qnaTitle.trim() || !editData.qnaContent.trim()) {
            showAlert({ title: '제목/내용을 입력하세요', icon: 'warning' });
            return;
        }
        const result = await showAlert({ title: '수정하시겠습니까?', icon: 'question', showCancelButton: true });
        if (!result.isConfirmed) return;
        // 실제 수정
        await editQna(id, { qnaTitle: editData.qnaTitle, qnaContent: editData.qnaContent });
        const updated = await fetchQnaDetail(id);
        setQna(updated);
        setEditMode(false);
        showAlert({ title: '수정 완료', icon: 'success', timer: 1000, showConfirmButton: false });
    };

  const handleDelete = async () => {
      if (!(isOwner || isAdmin)) {
        await showAlert({
          title: '권한이 없습니다.',
          text: '작성자 또는 관리자만 삭제 가능합니다.',
          icon: 'error'
        });
        return;
      }
      const result = await showAlert({ title: '삭제하시겠습니까?', icon: 'warning', showCancelButton: true });
      if (!result || !result.isConfirmed) return; // 취소 시 아무 동작 X
      await deleteQna(id);
      showAlert({ title: '삭제 완료', icon: 'success', timer: 1000, showConfirmButton: false });
      navigate('/customer/qna');
    };

  // 신고 버튼
	const handleReport = async () => {
	const result = await showAlert({
		title: '신고하시겠습니까?',
		text: '해당 게시글을 신고합니다.',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: '예',
		cancelButtonText: '아니오',
	});

	if (result && result.isConfirmed) {

		// 이미 신고한 사람(이전 기록 있음)
		if (localStorage.getItem(`qna_reported_${qna.id}`)) {
			await showAlert({
			title: '이미 신고하셨습니다.',
			icon: 'info',
			});
			return;
		}

		// 관리자라면 바로 신고글로 만들기
		if (isAdmin) {
		setQnas(qnas =>
			qnas.map(q =>
			q.id === qna.id
				? { ...q, reportCount: 5, isReported: true }
				: q
			)
		);

		let reportCount = parseInt(localStorage.getItem(`qna_reportCount_${qna.id}`) || "0", 10);

		// 이미 신고글로 분류된 경우 (5회 이상)
		if (qna.isReported || reportCount >= 5) {
			await showAlert({
			title: '이미 신고 처리된 게시글입니다.',
			imageUrl: process.env.PUBLIC_URL + '/img/huh.png',
			imageWidth: 300,
			imageHeight: 300,
			imageAlt: '어?',
			icon: 'info',
			});
			return;
		}
		await showAlert({
			title: '신고글로 바로 지정되었습니다.',
			imageUrl: process.env.PUBLIC_URL + '/img/you.png',
			imageWidth: 200,
			imageHeight: 200,
			imageAlt: '너고소',
			icon: 'success',
			timer: 1500,
			showConfirmButton: false,
		});
		return;
		}

		// 일반유저: 신고 카운트 누적
		setQnas(qnas =>
		qnas.map(q =>
			q.id === qna.id
			? {
				...q,
				reportCount: Math.min((q.reportCount || 0) + 1, 5),
				isReported: (q.reportCount || 0) + 1 >= 5
				}
			: q
		)
		);

		// localStorage에도 기록(중복방지용)
		localStorage.setItem(`qna_reported_${qna.id}`, 'true');

		await showAlert({
		title: '신고하였습니다.',
		icon: 'success',
		timer: 1500,
		showConfirmButton: false,
		});
	}
	};


  // 댓글 추가
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setQnas((prevQnas) =>
      prevQnas.map((item) =>
        item.id === qna.id
          ? {
              ...item,
              comments: [
                ...(item.comments || []),
                {
                  id: (item.comments?.length || 0) + 1,
                  qnaWriter: isAdmin ? '관리자' : 'me',
                  content: commentInput,
                  qnaCreatedAt: formatDate(new Date().toISOString().split('T')[0]),
                },
              ],
            }
          : item
      )
    );
    setCommentInput('');
  };

  if (!qna) return <p>게시글을 찾을 수 없습니다.</p>;

  // 관리자 답변 수정
  const handleEditAnswer = () => {
    setAnswerEditMode(true);
    setAnswerInput(qna?.answer || "");
  };
  

  const handleSaveAnswer = async () => {
    if (!answerInput.trim()) {
        await showAlert({
            title: '답변 내용을 입력해주세요!',
            imageUrl: process.env.PUBLIC_URL + '/img/what.jpg',
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: '에?',
            icon: 'warning',
            timer: 1300,
            showConfirmButton: false,
        });
        return;
    }
    const result = await showAlert({
        title: '답변을 저장하시겠습니까?',
        imageUrl: process.env.PUBLIC_URL + '/img/code.jpg',
        imageWidth: 300,
        imageHeight: 250,
        imageAlt: '코딩',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '네, 저장합니다',
        cancelButtonText: '아니오',
    });
    if (!result || !result.isConfirmed) return;

    // ***여기가 핵심: 실제 서버에 저장***
    await editQna(qna.id, { answer: answerInput, isAnswered: true });

    // ***최신 QnA 다시 조회해서 반영***
    const updated = await fetchQnaDetail(qna.id);
    setQna(updated);
    setAnswerEditMode(false);

    // 완료 토스트
    await showAlert({
        title: '저장되었습니다!',
        imageUrl: process.env.PUBLIC_URL + '/img/helmetGood.png',
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: '좋았쓰(헬멧)',
        icon: 'success',
        timer: 1300,
        showConfirmButton: false,
    });
};

    // 관리자 답변 삭제 (서버 연동)
    const handleDeleteAnswer = async () => {
        const result = await showAlert({
            title: '정말 답변을 삭제하시겠습니까?',
            imageUrl: process.env.PUBLIC_URL + '/img/what.jpg',
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: '에?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '네, 삭제합니다',
            cancelButtonText: '아니오',
        });
        if (!result || !result.isConfirmed) return;

        try {
            // 서버에 답변/상태 초기화 요청
            await editQna(qna.id, {
                ...qna,
                answer: '',
                isAnswered: false
            });

            // 프론트 상태도 갱신
            setQna(prev => ({
                ...prev,
                answer: '',
                isAnswered: false
            }));
            setAnswerEditMode(false);

            await showAlert({
                title: '삭제되었습니다!',
                imageUrl: process.env.PUBLIC_URL + '/img/helmetGood.png',
                imageWidth: 300,
                imageHeight: 300,
                imageAlt: '좋았쓰(헬멧)',
                icon: 'success',
                timer: 1200,
                showConfirmButton: false,
            });
        } catch (err) {
            await showAlert({
                title: '오류 발생',
                text: '답변 삭제에 실패했습니다.',
                icon: 'error'
            });
        }
    };

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
        <span className="qna-detail-title">{qna.qnaTitle}</span>
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
            <td style={{ background: '#fff', width: '18%', padding: 9 }}>{qna.qnaWriter}</td>
            <td style={{ background: '#f8f6ff', width: '15%', padding: 9, fontWeight: 700 }}>등록일</td>
            <td style={{ background: '#fff', width: '20%', padding: 9 }}>{formatDate(qna.qnaCreatedAt)}</td>
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
        }}>{qna.qnaContent}</pre>
      </div>
      {/* 4. 관리자 답변 */}
      {(qna.isAnswered || answerEditMode) && (
        <div className="qna-detail-answer">
          <div>
            <h3 style={{
              display: 'inline',
              marginRight: 10,
              fontWeight: 700,
              fontSize: 16,
              color: "#222"
            }}>💬 관리자 답변</h3>
            {answerEditMode ? (
              <textarea
                value={answerInput}
                onChange={e => setAnswerInput(e.target.value)}
                placeholder="답변을 입력하세요"
                style={{
                  width: '100%',
                  minHeight: 80,
                  margin: "12px 0 0 0",
                  fontSize: 15,
                  borderRadius: 5,
                  border: "1px solid #bfbfbf",
                  padding: 10
                }}
              />
            ) : (
              <span style={{ fontWeight: 500, fontSize: 16 }}>{qna.answer}</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
				{isAdmin && !answerEditMode && qna.isAnswered && (
					<>
						
						<button className="qna-action-btn" onClick={handleEditAnswer}>수정</button>
						<button className="qna-action-btn" onClick={handleDeleteAnswer}>삭제</button>
					</>
				)}
				{isAdmin && answerEditMode && (
					<>
						<button className="qna-action-btn" onClick={handleSaveAnswer}>저장</button>
						<button className="qna-action-btn" onClick={() => setAnswerEditMode(false)}>취소</button>
					</>
				)}
          </div>
          <div style={{ color: "#aaa", fontSize: 13 }}>
            {!answerEditMode && qna.answerDate && (
              <div style={{ color: "#aaa", fontSize: 13 }}>
                답변일: {qna.answerDate}
              </div>
            )}
          </div>
        </div>
      )}
      {/* 답변이 없고, 어드민이고, 수정모드 아니면 “답변 작성” 버튼 */}
      {isAdmin && !qna.isAnswered && !answerEditMode && (
        <div style={{ margin: "20px 0" }}>
          <button className="qna-action-btn" onClick={() => setAnswerEditMode(true)}>
            답변 작성
          </button>
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
      {isAdmin && qna.isReported && (
        <button onClick={handleRestore} className="qna-action-btn">복원</button>
      )}
      <button className="qna-action-btn" onClick={() => setEditMode(true)}>✏️ 수정</button>
      <button className="qna-action-btn" onClick={handleDelete}>🗑 삭제</button>
      <button className="qna-action-btn" onClick={() => navigate('/customer/qna')}>← 목록</button>
    </div>

      {/* 7. 댓글 */}
    <div style={{ margin: "35px 0 0 0" }}>
        <h4 style={{ marginBottom: 12, fontWeight: 700, fontSize: 17 }}>
            댓글 <span style={{ color: '#b19cd9' }}>({qna.comments ? qna.comments.length : 0})</span>
        </h4>
        <div style={{ marginLeft: 3 }}>
            {/* qna.comments가 없거나 0개일 때 */}
            {(!qna.comments || qna.comments.length === 0) && (
            <div style={{ color: "#aaa" }}>등록된 댓글이 없습니다.</div>
            )}
            {/* qna.comments가 있을 때 */}
            {qna.comments && qna.comments.map(c => (
            <div key={c.id} style={{
                marginBottom: 10,
                fontSize: 15,
                padding: '12px 0',
                borderBottom: '1px solid #f1f1f1'
            }}>
                <b>{c.user || c.qnaWriter}</b>
                <span style={{ color: "#bbb", fontSize: 13, marginLeft: 8 }}>{c.date}</span>
                <div style={{ marginLeft: 2 }}>
                {editCommentId === c.id ? (
                    <>
                    <input
                        type="text"
                        value={editCommentText}
                        onChange={e => setEditCommentText(e.target.value)}
                        style={{ fontSize: 15, width: '60%', padding: 5 }}
                    />
                    <button
                        style={{ marginLeft: 6 }}
                        onClick={handleSaveEditComment}
                    >저장</button>
                    <button
                        style={{ marginLeft: 4 }}
                        onClick={() => setEditCommentId(null)}
                    >취소</button>
                    </>
                ) : (
                    <>
                    {c.text || c.content}
                    {/* 관리자 또는 본인만 수정/삭제 */}
                    {(isAdmin || c.author === 'me') && (
                        <>
                        <button
                            style={{ marginLeft: 8, background: 'none', border: 'none', color: '#0984e3', cursor: 'pointer' }}
                            onClick={() => handleEditComment(c)}
                        >✏️ 수정</button>
                        <button
                            style={{ marginLeft: 8, background: 'none', border: 'none', color: '#e17055', cursor: 'pointer' }}
                            onClick={() => handleDeleteComment(c.id)}
                        >🗑 삭제</button>
                        </>
                    )}
                    </>
                )}
                </div>
            </div>
            ))}
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
                <span
                  className="nav-reported"
                  style={{
                    color: "#ff7676",
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginLeft: 4
                  }}
                  onClick={() => {
                    if (isAdmin) {
                      navigate(`/customer/qna/${prev.id}`);
                    } else {
                      showAlert && showAlert({
                        title: '🚫 관리자 검토중',
                        text: '신고가 누적된 글입니다.',
                        icon: 'warning',
                      });
                    }
                  }}
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
                <span
                  className="nav-reported"
                  style={{
                    color: "#ff7676",
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginLeft: 4
                  }}
                  onClick={() => {
                    if (isAdmin) {
                      // 👇 어드민은 이동
                      navigate(`/customer/qna/${next.id}`);
                    } else {
                      // 👇 일반 유저는 경고
                      showAlert && showAlert({
                        title: '🚫 관리자 검토중',
                        text: '신고가 누적된 글입니다.',
                        icon: 'warning',
                      });
                    }
                  }}
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

export default QnADetail;
