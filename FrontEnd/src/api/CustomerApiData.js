import axios from 'axios';

// FAQ get, post, put, delete 순서
export const fetchFaqs = async () => {
    const res = await axios.get('http://localhost:8888/customer/faq');
    return res.data;
};

export const createFaq = async (faq) => {
    const res = await axios.post('http://localhost:8888/customer/faq', faq);
    return res.data;
};

export const editFaq = async (faqId, data) => {
    const res = await axios.put(`http://localhost:8888/customer/faq/${faqId}`, data);
    return res.data;
};

export const deleteFaq = async (faqId) => {
    const res = await axios.delete(`http://localhost:8888/customer/faq/${faqId}`);
    return res.data;
};

// QnA 전체 리스트 조회
export const fetchQnaList = async () => {
    const res = await axios.get('http://localhost:8888/customer/qna');
    return res.data;
};

// QnA 단일 조회
export const fetchQnaDetail = async (qnaId, password = null) => {
    const url = password
        ? `http://localhost:8888/customer/qna/${qnaId}?password=${password}`
        : `http://localhost:8888/customer/qna/${qnaId}`;
    const res = await axios.get(url);
    return res.data;
};

// QnA 등록
export const createQna = async (qna) => {
    const res = await axios.post('http://localhost:8888/customer/qna', qna);
    return res.data;
};

// QnA 수정
export const editQna = async (qnaId, data) => {
    const res = await axios.put(`http://localhost:8888/customer/qna/${qnaId}`, data);
    return res.data;
};

// QnA 삭제
export const deleteQna = async (qnaId) => {
    const res = await axios.delete(`http://localhost:8888/customer/qna/${qnaId}`);
    return res.data;
};

// QnA 신고
export const reportQna = async (qnaId) => {
    // PATCH or POST(백엔드 설계 따라 다름)
    return axios.patch(`http://localhost:8888/customer/qna/${qnaId}/report`);
};

// QnA 복원
export const restoreQna = async (qnaId) => {
    // const token = localStorage.getItem('yourAuthToken'); // <-- 'yourAuthToken'을 실제 토큰 키값으로 변경하세요
    
    // const config = {};
    // if (token) {
    //     config.headers = {
    //         Authorization: `Bearer ${token}`
    //     };
    // }
    try {
        const res = await axios.patch(
            `http://localhost:8888/customer/qna/${qnaId}/restore`,
            // config
        );
        return res.data;
    } catch (error) {
        console.error('restoreQna API 호출 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 답변 작성/수정 (PUT or PATCH)
export const updateQnaAnswer = async (qnaId, answer, answerWriter) => {
    const res = await axios.patch(`http://localhost:8888/customer/qna/${qnaId}/answer`, {
        answer,
        answerWriter
    });
    return res.data;
};

// QnA 답변 삭제 (실제로는 빈 문자열로 PATCH)
export const deleteQnaAnswer = async (qnaId) => {
    const res = await axios.patch(`http://localhost:8888/customer/qna/${qnaId}/answer`, {
        answer: '',
        answerWriter: ''
    });
    return res.data;
};

// QnA 댓글 등록
export const createQnaComment = async (qnaId, data) => {
    // data = { content, writer, ... }
    const res = await axios.post(`http://localhost:8888/customer/qna/${qnaId}/comments`, data);
    return res.data;
};

// QnA 댓글 수정
export const editQnaComment = async (commentId, data) => {
    // data = { content, ... }
    const res = await axios.put(`http://localhost:8888/customer/qna/comments/${commentId}`, data);
    return res.data;
};

// QnA 댓글 삭제
export const deleteQnaComment = async (commentId) => {
    const res = await axios.delete(`http://localhost:8888/customer/qna/comments/${commentId}`);
    return res.data;
};

