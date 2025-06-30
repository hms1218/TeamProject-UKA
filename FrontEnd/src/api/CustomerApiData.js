import axios from 'axios';

// FAQ get, post, put, delete 순서
export const fetchFaqs = async () => {
    try {
        const res = await axios.get('http://localhost:8888/customer/faq');
        return res.data;
    } catch (error) {
        console.error('fetchFaqs API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createFaq = async (faq) => {
    try {
        const res = await axios.post('http://localhost:8888/customer/faq', faq);
        return res.data;
    } catch (error) {
        console.error('createFaq API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const editFaq = async (faqId, data) => {
    try {
        const res = await axios.put(`http://localhost:8888/customer/faq/${faqId}`, data);
        return res.data;
    } catch (error) {
        console.error('editFaq API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteFaq = async (faqId) => {
    try {
        const res = await axios.delete(`http://localhost:8888/customer/faq/${faqId}`);
        return res.data;
    } catch (error) {
        console.error('deleteFaq API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 전체 리스트 조회
export const fetchQnaList = async () => {
    try {
        const res = await axios.get('http://localhost:8888/customer/qna');
        return res.data;
    } catch (error) {
        console.error('fetchQnaList API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 단일 조회
export const fetchQnaDetail = async (qnaId, password = null) => {
    try {
        const url = password
            ? `http://localhost:8888/customer/qna/${qnaId}?password=${password}`
            : `http://localhost:8888/customer/qna/${qnaId}`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error('fetchQnaDetail API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 등록
export const createQna = async (qna) => {
    try {
        const res = await axios.post('http://localhost:8888/customer/qna', qna);
        return res.data;
    } catch (error) {
        console.error('createQna API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 수정
export const editQna = async (qnaId, data) => {
    try {
        const res = await axios.put(`http://localhost:8888/customer/qna/${qnaId}`, data);
        return res.data;
    } catch (error) {
        console.error('editQna API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 삭제
export const deleteQna = async (qnaId) => {
    try {
        const res = await axios.delete(`http://localhost:8888/customer/qna/${qnaId}`);
        return res.data;
    } catch (error) {
        console.error('deleteQna API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 신고
export const reportQna = async (qnaId) => {
    try {
        const res = await axios.patch(`http://localhost:8888/customer/qna/${qnaId}/report`);
        return res.data;
    } catch (error) {
        console.error('reportQna API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 복원
export const restoreQna = async (qnaId) => {
    try {
        const res = await axios.patch(`http://localhost:8888/customer/qna/${qnaId}/restore`);
        return res.data;
    } catch (error) {
        console.error('restoreQna API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 답변 작성/수정 (PUT or PATCH)
export const updateQnaAnswer = async (qnaId, answer, answerWriter) => {
    try {
        const res = await axios.patch(`http://localhost:8888/customer/qna/${qnaId}/answer`, {
            answer,
            answerWriter
        });
        return res.data;
    } catch (error) {
        console.error('updateQnaAnswer API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 답변 삭제 (실제로는 빈 문자열로 PATCH)
export const deleteQnaAnswer = async (qnaId) => {
    try {
        const res = await axios.patch(`http://localhost:8888/customer/qna/${qnaId}/answer`, {
            answer: '',
            answerWriter: ''
        });
        return res.data;
    } catch (error) {
        console.error('deleteQnaAnswer API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 댓글 등록
export const createQnaComment = async (qnaId, data) => {
    try {
        const res = await axios.post(`http://localhost:8888/customer/qna/${qnaId}/comments`, data);
        return res.data;
    } catch (error) {
        console.error('createQnaComment API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 댓글 수정
export const editQnaComment = async (commentId, data) => {
    try {
        const res = await axios.put(`http://localhost:8888/customer/qna/comments/${commentId}`, data);
        return res.data;
    } catch (error) {
        console.error('editQnaComment API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// QnA 댓글 삭제
export const deleteQnaComment = async (commentId) => {
    try {
        const res = await axios.delete(`http://localhost:8888/customer/qna/comments/${commentId}`);
        return res.data;
    } catch (error) {
        console.error('deleteQnaComment API 에러:', error.response ? error.response.data : error.message);
        throw error;
    }
};
