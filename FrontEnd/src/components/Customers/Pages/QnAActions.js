import { likeQna, unlikeQna, fetchQnaDetail, deleteQnaComment, editQnaComment, createQnaComment } from '../../../api/CustomerApiData'; // 실제 API 함수 import
import { MapQnaRaw } from '../Mappers/QnaMapper'; // MapQnaRaw 함수 import
import { useAlert } from '../Context/AlertContext'; // showAlert 함수 import (만약 context 등에서 사용한다면)

export const handleLikeAction = async ({
  qna,
  user,
  isLiked,
  setQna,
  setLikes,
  setIsLiked,
  showAlert,
  setLikeLoading, // 🔁 (선택) 중복 클릭 방지용 상태
}) => {
  if (!user || !user.userId) {
    await showAlert({
      title: '로그인이 필요합니다.',
      icon: 'warning',
    });
    return;
  }

  const storageKey = `qna_liked_${user.userId}_${qna.id}`;

  try {
    setLikeLoading?.(true); // ✅ 로딩 true로

    if (isLiked) {
      await unlikeQna(qna.id, user.userId);
      localStorage.removeItem(storageKey);
    } else {
      await likeQna(qna.id, user.userId);
      localStorage.setItem(storageKey, 'true');
    }

    // ⛔ 상태는 서버 응답 기준으로만 갱신
    const updated = await fetchQnaDetail(qna.id);
    const mapped = MapQnaRaw(updated);
    setQna(mapped);
    setLikes(mapped.likes || 0);
    setIsLiked(mapped.isLikedByMe); // ✅ 여기서만 업데이트

  } catch (e) {
    if (e.response?.status === 409) {
      await showAlert({ title: '이미 추천하셨습니다.', icon: 'info' });
      setIsLiked(true); // 서버 기준 반영
    } else if (e.response?.status === 404) {
      await showAlert({ title: '추천 기록이 없습니다.', icon: 'info' });
      setIsLiked(false);
    } else {
      await showAlert({
        title: '⚠️ 추천 오류',
        text: e.response?.data?.message || '추천 처리 중 오류가 발생했습니다.',
        icon: 'warning',
      });
    }
  } finally {
    setLikeLoading?.(false); // 🔁 항상 로딩 false
  }
};


// 댓글 등록 핸들러
export async function handleCommentSubmit({
    e,
    qna,
    commentInput,
    user,
    isAdmin,
    setQna,
    setCommentInput,
    showAlert,
    MapQnaRaw
    }) {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
        await createQnaComment(qna.qnaNo, {
        qnaId: qna.qnaId,
        qnaCommentWriter: isAdmin ? '관리자' : user.nickname,
        qnaCommentContent: commentInput
        });

        const updated = await fetchQnaDetail(qna.qnaNo);
        setQna(MapQnaRaw(updated));
        setCommentInput('');
    } catch (error) {
        showAlert && showAlert({
        title: '댓글 등록 실패',
        text: error?.message || '서버 오류',
        icon: 'error'
        });
    }
}

// 댓글 수정 핸들러
export async function handleEditSave(commentId, newContent, fetchData, setEditingCommentId) {
    await editQnaComment(commentId, newContent);
    await fetchData();
    setEditingCommentId(null);
}

// 댓글 삭제 핸들러
export async function handleDeleteComment(commentId, fetchData, showAlert) {
    const ok = await showAlert({
        title: '댓글 삭제',
        text: '정말 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true, // SweetAlert2, Swal 등에서 확인/취소
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
    });
    if (ok) {
        await deleteQnaComment(commentId);
        await fetchData();
    }
}