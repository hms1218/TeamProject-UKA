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
    isAnswered: false
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
    answer: '네, 정기후원은 마이페이지 > 후원관리에서 신청 가능합니다. 감사합니다.'
  },
  {
    id: 3,
    title: '문의3',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-13T07:00:00',
    isAnswered: false
  },
  {
    id: 4,
    title: '문의4',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-11T09:00:00'
  },
  {
    id: 5,
    title: '문의5',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    isReported: true,
    createdAt: '2025-06-13T01:20:00'
  },
  {
    id: 6,
    title: '문의6',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-12T22:00:00'
  },
  {
    id: 7,
    title: '문의7',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-10T14:00:00'
  },
  {
    id: 8,
    title: '문의8',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-09T12:30:00'
  },
  {
    id: 9,
    title: '문의9',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-08T18:00:00'
  },
  {
    id: 10,
    title: '문의10',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-12T19:00:00'
  },
  {
    id: 11,
    title: '문의11',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-12T17:30:00'
  },
  {
    id: 12,
    title: '문의12',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-11T22:45:00'
  },
  {
    id: 13,
    title: '문의13333333333333333333333333333333333333333333333333333333333333333333333333333',
    author: 'user2',
    content: '입양에 대해 궁금해요',
    isSecret: true,
    password: '1234',
    createdAt: '2025-06-11T10:15:00'
  },
  {
    id: 14,
    title: '문의14',
    author: 'user3',
    content: '입양에 대해 궁금해요',
    isSecret: false,
    createdAt: '2025-06-13T02:10:00'
  }
];

export const QnAProvider = ({ children }) => {
  const [qnas, setQnas] = useState(initialQnAs);
  return <QnAContext.Provider value={{ qnas, setQnas }}>{children}</QnAContext.Provider>;
};

export const useQnA = () => useContext(QnAContext);
