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