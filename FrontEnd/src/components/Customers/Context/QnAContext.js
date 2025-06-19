import { createContext, useContext, useState } from 'react';

const QnAContext = createContext();

const initialQnAs = [
  {
    id: 1,
    title: '문의1',
    author: 'user1',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    isReported: false,
    createdAt: '2025-06-13T08:30:00',
    isAnswered: false,
    comments: [
      { id: 1, user: "관리자", text: "입양 관련 문의 감사합니다!" },
      { id: 2, user: "user2", text: "저도 같은 궁금증이 있었어요." }
    ]
  },
  {
    id: 2,
    title: '문의2',
    author: 'user2',
    content: '정기후원이 가능한가요?',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-12T10:15:00',
    isAnswered: true,
    answer: '네, 정기후원은 마이페이지 > 후원관리에서 신청 가능합니다. 감사합니다.',
    answerDate: '2025-06-13T10:55:00',
    comments: [
      { id: 1, user: "관리자", text: "정기후원 관련 정보는 안내 페이지 참고해 주세요!" }
    ]
  },
  {
    id: 3,
    title: '문의3',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-13T07:00:00',
    isAnswered: false,
    comments: [
      { id: 1, user: "관리자", text: "답변 준비 중입니다." }
    ]
  },
  {
    id: 4,
    title: '문의4',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-11T09:00:00',
    comments: [
      { id: 1, user: "user2", text: "빠른 답변 부탁드려요!" }
    ]
  },
  {
    id: 5,
    title: '문의5',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    isReported: true,
    createdAt: '2025-06-13T01:20:00',
    comments: [
      { id: 1, user: "관리자", text: "신고 관련 확인 후 안내드리겠습니다." }
    ]
  },
  {
    id: 6,
    title: '문의6',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-12T22:00:00',
    comments: [
      { id: 1, user: "user1", text: "입양 후기는 어디서 볼 수 있나요?" }
    ]
  },
  {
    id: 7,
    title: '문의7',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-10T14:00:00',
    comments: [
      { id: 1, user: "관리자", text: "문의해 주셔서 감사합니다!" }
    ]
  },
  {
    id: 8,
    title: '문의8',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-09T12:30:00',
    comments: [
      { id: 1, user: "user2", text: "답변 기다리고 있어요~" }
    ]
  },
  {
    id: 9,
    title: '문의9',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-08T18:00:00',
    comments: [
      { id: 1, user: "관리자", text: "곧 답변드릴 예정입니다." }
    ]
  },
  {
    id: 10,
    title: '문의10',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-12T19:00:00',
    comments: [
      { id: 1, user: "user1", text: "문의 감사합니다!" }
    ]
  },
  {
    id: 11,
    title: '문의11',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-12T17:30:00',
    comments: [
      { id: 1, user: "관리자", text: "확인 후 안내드릴게요." }
    ]
  },
  {
    id: 12,
    title: '문의12',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-11T22:45:00',
    comments: [
      { id: 1, user: "user3", text: "답변 잘 받았습니다." }
    ]
  },
  {
    id: 13,
    title: '문의13',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-11T10:15:00',
    comments: [
      { id: 1, user: "user2", text: "추가 문의도 가능할까요?" }
    ]
  },
  {
    id: 14,
    title: '문의14',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-13T02:10:00',
    isAnswered: true,
    answer: '네, 정기후원은 마이페이지 > 후원관리에서 신청 가능합니다. 감사합니다.',
    answerDate: '2025-06-13T10:55:00',
    comments: [
      { id: 1, user: "관리자", text: "입양에 대해 궁금한 점 언제든 남겨주세요!" }
    ]
  }
];


export const QnAProvider = ({ children }) => {
  const [qnas, setQnas] = useState(initialQnAs);
  return <QnAContext.Provider value={{ qnas, setQnas }}>{children}</QnAContext.Provider>;
};

export const useQnA = () => useContext(QnAContext);
