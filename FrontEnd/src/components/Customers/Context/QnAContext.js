// QnAContext.js (혹은 QnAProvider.js)
import { createContext, useContext, useState } from 'react';

// ▶️ 랜덤 유틸
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomPick(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}
function fixedDate(idx) {
    // idx=0: 2025-01-01, idx=1: 2025-01-02, ...
    const base = new Date(2025, 0, 1); // 2025-01-01
    base.setDate(base.getDate() + idx);
    // 랜덤 시간을 쓰고 싶으면 아래 주석 풀기
    // const hh = String(getRandomInt(8, 23)).padStart(2, '0');
    // const mm = String(getRandomInt(0, 59)).padStart(2, '0');
    // const ss = String(getRandomInt(0, 59)).padStart(2, '0');
    // return `${yyyy}-${mm}-${dd}T${hh}:${mm}:${ss}`;

    // 고정 시간 (예시: 12:34:56)
    const yyyy = base.getFullYear();
    const mm = String(base.getMonth() + 1).padStart(2, '0');
    const dd = String(base.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T12:34:56`;
}
function randomTitle(idx) {
    const keywords = ['입양문의', '후원질문', '봉사', '회원탈퇴', '기타', '계정', '공고', '의견', '피드백', '신고'];
    return `문의${idx+1} - ${randomPick(keywords)}`;
}
function randomContent() {
    const options = [
        "입양 절차가 궁금합니다.",
        "정기후원은 어떻게 신청하나요?",
        "자원봉사 신청 방법이 궁금합니다.",
        "회원탈퇴는 어디서 하나요?",
        "비밀번호 변경이 안됩니다.",
        "강아지 입양 조건이 뭔가요?",
        "후기 작성은 어떻게 하나요?",
        "신고 방법을 알려주세요.",
        "이벤트 참여는 어떻게 하나요?",
        "서비스가 너무 좋아요!"
    ];
    return randomPick(options);
}
function randomAnswer() {
    const answers = [
        "문의주셔서 감사합니다. 관리자 확인 후 연락드리겠습니다.",
        "네, 해당 서비스는 마이페이지에서 신청 가능합니다.",
        "상세 내용은 공지사항을 확인해주세요.",
        "관리자 검토 후 답변드릴 예정입니다.",
        "고객센터를 통해 문의주시면 빠르게 처리해드립니다."
    ];
    return randomPick(answers);
}
function randomAuthor() {
    return randomPick(['user1', 'user2', 'user3', 'guest', '관리자']);
}

export function generateDummyQnA(n = 50) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        const id = i + 1;
        const isSecret = Math.random() < 0.4;
        const isAnswered = Math.random() < 0.6;
        arr.push({
            id,
            title: randomTitle(i),
            author: randomAuthor(),
            content: randomContent(),
            isSecret,
            password: isSecret ? "1234" : "",
            isAnswered,
            answer: isAnswered ? randomAnswer() : undefined,
            isReported: Math.random() < 0.15,
            createdAt: fixedDate(i),    // ← 날짜 순차 증가
            comments: [],
        });
    }
    return arr;
}

const QnAContext = createContext();

export const QnAProvider = ({ children }) => {
    const [qnas, setQnas] = useState(() => generateDummyQnA(150));
    return <QnAContext.Provider value={{ qnas, setQnas }}>{children}</QnAContext.Provider>;
};

export const useQnA = () => useContext(QnAContext);